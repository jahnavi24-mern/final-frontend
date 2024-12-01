import TopSection from '../components/TopSection/TopSection';
import Navbar from '../components/Navbar/Navbar';
import { useState, useEffect } from 'react';
import AddressModal from '../components/AddressModal/AddressModal';
import { addAddress, getProfile } from '../api/api';
import "../styles/Address.css";

const Address = () => {
    const [showAddressModal, setShowAddressModal] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {

        getProfile()
            .then(data => {
                if (data && data.user) {
                    setUser(data);
                } else {
                    navigate('/login');
                }
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                navigate('/login');
            });
    }, []);

    const handleAddNewAddress = (addressData) => {
        addAddress(addressData)
            .then(data => {
                if (data.success) {
                    getProfile().then(updatedData => setUser(updatedData));
                }
                setShowAddressModal(false);
            })
            .catch(error => {
                console.error('Error adding address:', error);
            });
    }

    const handleCancel = () => {
        setShowAddressModal(false);
    }

    console.log(user, "user.addresses");

    return (
        <>
            <TopSection />
            <Navbar />
            <div className="address-container">
                <div className="address-header">
                    <img src="../arrow-left.svg" alt="arrow" />
                    <p>Your Addresses</p>
                </div>

                <div className="address-content">
                    <div className="address-content-item-add" onClick={() => setShowAddressModal(true)}>
                        <img src="../plus-2.svg" alt="location" />
                        <p>Add Address</p>
                    </div>

                    {user?.user?.addresses?.map((address) => (
                        <>
                            <div className="address-content-item" key={address._id}>
                                <p className="address-content-item-name">{address.name}</p>
                                <p className="address-content-item-address">{address.fullAddress}</p>

                                <p className="address-content-item-phone">Phone Number: {address.phoneNumber}</p>

                                <div className="address-content-item-edit">
                                    <p onClick={() => setShowAddressModal(true)}>Edit</p>
                                    <p>|</p>
                                    <p onClick={() => removeAddress(address._id)}>Delete</p>
                                </div>
                            </div>
                        </>
                    ))}

                </div>
            </div>

            {showAddressModal && (
                <AddressModal
                    handleSave={handleAddNewAddress}
                    handleCancel={handleCancel}
                />
            )}
        </>
    )
}

export default Address;