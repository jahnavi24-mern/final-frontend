import { useState } from "react";
import "./AddressModal.css";
const AddressModal = ({ handleSave, handleCancel }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        state: '',
        city: '',
        postcode: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };
    return (
        <div className="address-modal">
            <div className="address-modal-content">
                <div className="address-modal-header">
                    <img src="../Vector.svg" alt="vector" />
                    <p>Add Address</p>
                </div>

                <div className="address-modal-content-item">
                    <input 
                        type="text" 
                        name="name"
                        value={formData.name} 
                        placeholder="Name" 
                        onChange={handleChange} 
                    />
                </div>

                <div className="address-content-1">
                    <div className="address-modal-content-item">
                        <input 
                            type="text" 
                            name="state"
                            value={formData.state} 
                            placeholder="State" 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="address-modal-content-item">
                        <input 
                            type="text" 
                            name="city"
                            value={formData.city} 
                            placeholder="City" 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="address-modal-content-item">
                        <input 
                            type="text" 
                            name="postcode"
                            value={formData.postcode} 
                            placeholder="Pin Code" 
                            onChange={handleChange} 
                        />
                    </div>

                    <div className="address-modal-content-item">
                        <input 
                            type="text" 
                            name="phoneNumber"
                            value={formData.phoneNumber} 
                            placeholder="Phone Number" 
                            onChange={handleChange} 
                        />
                    </div>
                </div>

                <div className="address-modal-content-item">
                    <textarea 
                        name="address"
                        value={formData.address} 
                        placeholder="Enter full address" 
                        onChange={handleChange}
                        rows="3"
                        cols="50"
                    />
                </div>

                <div className="address-modal-buttons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button onClick={handleSubmit} className="button">Save</button>
                </div>

            </div>
        </div>
    )
}

export default AddressModal;