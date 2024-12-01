import { useState, useEffect } from "react";
import "../styles/App.css";
import { signin, signup } from "../api/api";
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const beURL = "https://final-backend-oewj.onrender.com/api"

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [homeImage, setHomeImage] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");   
    const [phone, setPhone] = useState("");
    
    const navigate = useNavigate();
    const { login } = useAuth();

    useEffect(() => {
        fetch(`${beURL}/image?name=base-image`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.img.length > 0) {
                    setHomeImage(data.img[0].fileUrl);
                }
            })
            .catch(error => console.error('Error fetching home image:', error));
    }, []);

    const toggleForm = () => setIsLogin(!isLogin);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const data = await signin({ email, password });
                
                if (data.success) {
                    localStorage.setItem('authToken', data.token);
                    await login({
                        firstName: data.user.fullName.split(' ')[0],
                        email: data.user.email,
                    });
                    toast.success('Login successful!');
                    navigate('/home');
                } else {
                    alert(data.message || 'Login failed');
                }
            } else {
                
                const data = await signup({name, phone, email, password});
                
                if (data.success) {
                    toast.success('Signup successful!');
                    toggleForm();
                } else {
                    alert(data.message || 'Signup failed');
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            alert('An error occurred. Please try again.');
        }
    }


    return (
        <div className="auth-container">
            <div className="auth-card">
                <div className="auth-card-header">
                    <img src="../logo.svg" alt="Logo" className="logo"/>
                </div>

                <div className="auth-card-body">
                <h1>{isLogin ? "Welcome Back" : "Welcome"} <span className="emoji">👋</span></h1>
                <p>Today is a new day. It's your day. You shape it. Sign in to start ordering.</p>
                </div>
                {isLogin ? 
                    <LoginForm 
                        handleSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        isLogin={isLogin}
                        toggleForm={toggleForm}
                    /> : 
                    <SignupForm 
                        handleSubmit={handleSubmit}
                        isLogin={isLogin}
                        toggleForm={toggleForm}
                        name={name}
                        setName={setName}
                        phone={phone}
                        setPhone={setPhone}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                }
            </div>

            <div className="home-image">
                {homeImage && <img src={homeImage} alt="Home"/>}
            </div>
        </div>
    )
}

const LoginForm = ({ handleSubmit, email, setEmail, password, setPassword, isLogin, toggleForm }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Example@email.com" 
                        label="Email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>   
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="At least 8 characters" 
                        label="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)}
                        required/>
                </div>
                <button type="submit">{isLogin ? "Sign in" : "Continue"}</button>
            </form>

            <div className="auth-footer">
                    <p>Don't have an account? <span onClick={toggleForm}>Signup</span></p>
            </div>
        </>
    )
}

const SignupForm = ({ handleSubmit, isLogin, toggleForm, name, setName, phone, setPhone, email, setEmail, password, setPassword }) => {
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        name="name"
                        placeholder="eg. John A" 
                        label="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="phone">Phone Number</label>
                    <input 
                        type="phone" 
                        name="phone"
                        placeholder="Enter your 10 digit mobile number" 
                        label="Phone Number" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        name="email"
                        placeholder="Example@email.com" 
                        label="Email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="At least 8 characters" 
                        label="Password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">{isLogin ? "Signin" : "Continue"}</button>
            </form>

            <div className="auth-footer">
                <p>Already have an account? <span onClick={toggleForm}>Signin</span></p>
            </div>
        </>
    )
}

export default Auth;