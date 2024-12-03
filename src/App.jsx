import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth from './pages/Auth';
import {Footer} from './components/Footer/Footer'
import Home from './pages/Home';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Address from './pages/Address';
import Payment from './pages/Payment';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ToastProvider>
          <CartProvider>
            <div className="app">
              <Routes>
                <Route path="/" element={<ProtectedRoot />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<div className="checkout-route"><Checkout /></div>} />
                <Route path="/address" element={<Address />} />
                <Route path="/payment" element={<div className="payment-route"><Payment /></div>} />
              </Routes>
              <Footer />
            </div>
          </CartProvider>
        </ToastProvider>
      </Router>
    </AuthProvider>
  )
}

const ProtectedRoot = () => {
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Auth />;
};

export default App;