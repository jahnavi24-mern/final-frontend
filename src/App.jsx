import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth';
import {Footer} from './components/Footer/Footer'
import Home from './pages/Home';
import Product from './pages/Product';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Address from './pages/Address';
import Payment from './pages/Payment';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <CartProvider>
        <AuthProvider>
          <BrowserRouter>
            <div className="app">
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/home" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/address" element={<Address />} />
                <Route path="/payment" element={<Payment />} />
              </Routes>
              <Footer />
            </div>
          </BrowserRouter>
        </AuthProvider>
      </CartProvider>
    </ToastProvider>
  )
}

export default App;