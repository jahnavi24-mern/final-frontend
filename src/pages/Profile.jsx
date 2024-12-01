import TopSection from "../components/TopSection/TopSection";
import Navbar from "../components/Navbar/Navbar";
import { getProfile, editProfile, addPaymentMethod, removePaymentMethod } from "../api/api";
import { useState, useEffect } from "react";
import CardModal from "../components/CardModal/CardModal";
import "../styles/Profile.css";

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [editCard, setEditCard] = useState(null);
    const [showCardModal, setShowCardModal] = useState(false);

    useEffect(() => {
        getProfile().then(data => setProfile(data));
    }, []);

    const handleSave = () => {
        editProfile({ fullName, phoneNumber, email, gender, country }).then(data => {
            setProfile(data);
            setEdit(false);
        });
        setShowCardModal(false);
    }

    const handleEdit = () => {
        setEdit(true);
    }

    const handleAddNewCard = () => {
        addPaymentMethod(profile?.user?.cards).then(data => {
            setProfile(data);
        });
        setShowCardModal(false);
    }

    const handleEditCard = (card) => {
        setShowCardModal(true);
        setEditCard(card);
    }

    const handleRemove = (card) => {
        removePaymentMethod(card._id);
    }


    return (
        <>
            <TopSection />
            <Navbar />
            <div className="profile-details-container">
                <div className="profile-details-header">
                    <img src="../arrow-left.svg" alt="user" />
                    <p>My Profile</p>
                </div>

                <div className="profile-section-name">
                    <div className="profile-section-name-left">
                        <p>{profile?.user?.fullName}</p>
                    </div>
                    <div className="profile-section-name-right">
                        <button onClick={edit ? handleSave : handleEdit}>
                            {edit ? "Save" : "Edit"}
                        </button>
                    </div>
                </div>

                <div className="profile-section-details">
                    <div className="profile-input-group">
                        <label>Full Name</label>
                        <input
                            type="text"
                            value={profile?.user?.fullName || ''}
                            disabled={!edit}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                user: { ...prev.user, fullName: e.target.value }
                            }))}
                        />
                    </div>
                    <div className="profile-input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={profile?.user?.email || ''}
                            disabled={!edit}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                user: { ...prev.user, email: e.target.value }
                            }))}
                        />
                    </div>
                    <div className="profile-input-group">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            value={profile?.user?.phoneNumber || ''}
                            disabled={!edit}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                user: { ...prev.user, phoneNumber: e.target.value }
                            }))}
                        />
                    </div>

                    <div className="profile-input-group">
                        <label>Gender</label>
                        <input
                            type="text"
                            value={profile?.user?.gender || ''}
                            disabled={!edit}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                user: { ...prev.user, gender: e.target.value }
                            }))}
                        />
                    </div>

                    <div className="profile-input-group">
                        <label>Country</label>
                        <input
                            type="text"
                            value={profile?.user?.country || ''}
                            disabled={!edit}
                            onChange={(e) => setProfile(prev => ({
                                ...prev,
                                user: { ...prev.user, country: e.target.value }
                            }))}
                        />
                    </div>
                </div>

                <hr className="profile-divider" />

                <div className="payment-method-container">
                    <div className="payment-method-header">
                        <p>Saved Payment Methods</p>
                    </div>

                    <div className="payment-method-cards">
                        {profile?.user?.cards?.map(card => (
                            <div className="payment-method-card" key={card._id}>
                                <div className="card-logo">
                                    <img src="../credit-card.svg" alt="credit-card" />
                                </div>
                                <div className="card-details">
                                    <p>xxxx xxxx xxxx {card.cardNumber.slice(-4)}</p>
                                    <p>{card.cardHolderName}</p>
                                </div>
                                <img src="../edit-3.svg" alt="edit" className="edit-icon" onClick={() => handleEditCard(card)}/>
                            </div>
                        ))}

                        <div className="add-new-card payment-method-card" onClick={() => setShowCardModal(true)}>
                            <img src="../plus-2.svg" alt="plus" />
                            <p>Add New Card</p>
                        </div>
                    </div>
                </div>

            </div>
            {showCardModal && (
                <CardModal 
                    card={editCard}
                    handleSave={handleAddNewCard}
                    handleCancel={() => setShowCardModal(false)}
                    handleRemove={() => handleRemove(editCard)}
                />
            )}
        </>

    );
}

export default Profile;