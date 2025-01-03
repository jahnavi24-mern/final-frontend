import "./CardModal.css";
import { useState } from "react";
import { addPaymentMethod, editPaymentMethod, removePaymentMethod } from "../../api/api";
import { useToast } from "../../context/ToastContext";

const CardModal = ({ card, handleCancel, handleSave }) => {
    const [cardNumber, setCardNumber] = useState(card?.cardNumber || "");
    const [expiryDate, setExpiryDate] = useState(card?.expiryDate || "");
    const [cvv, setCvv] = useState(card?.cvv || "");
    const [nameOnCard, setNameOnCard] = useState(card?.cardHolderName || "");
    const toast = useToast();

    const displayCardNumber = card?.cardNumber ? 
        `xxxx xxxx xxxx ${card.cardNumber.slice(-4)}` : cardNumber;
    const displayCvv = card?.cvv ? "xxx" : cvv;

    const handleSubmit = async (e) => {
        e.preventDefault();
        const cardData = { cardNumber, expiryDate, cvv, nameOnCard };

        try {
            if (!cardNumber || !expiryDate || !cvv || !nameOnCard) {
                toast.error('Please fill in all card details');
                return;
            }

            if (card?._id) {
                await editPaymentMethod(cardData);
                toast.success('Card updated successfully');
            } else {
                await addPaymentMethod(cardData);
                toast.success('Card added successfully');
            }
            handleSave(cardData);
        } catch (error) {
            console.error('Failed to save card:', error);
            toast.error(error.message || 'Failed to save card details');
        }
    }

    const handleRemove = async (cardId) => {
        try {
            await removePaymentMethod(cardId);
            toast.success('Card removed successfully');
            handleCancel();
        } catch (error) {
            console.error('Failed to remove card:', error);
            toast.error('Failed to remove card');
        }
    }

    return (
        <div className="card-modal-container">
            <form onSubmit={handleSubmit} className="card-modal-content">
                <div className="card-modal-header">
                    <h2>{card?.id ? 'Edit Payment Method' : 'Add Payment Method'}</h2>
                </div>
                <div className="card-input-group">
                    <label>Card Number</label>
                    <input 
                        type="text" 
                        placeholder="xxxx xxxx xxxx xxxx" 
                        value={card?._id ? displayCardNumber : cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)} 
                    />
                </div>
                <div className="card-input-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="Expiry Date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
                </div>
                <div className="card-input-group">
                    <label>CVV</label>
                    <input 
                        type="text" 
                        placeholder="CVV" 
                        value={card?._id ? displayCvv : cvv}
                        onChange={(e) => setCvv(e.target.value)} 
                    />
                </div>
                <div className="card-input-group">
                    <label>Name on Card</label>
                    <input type="text" placeholder="Name on Card" value={nameOnCard} onChange={(e) => setNameOnCard(e.target.value)} />
                </div>
                <div className="card-modal-buttons">
                    {card?._id && <button type="button" className="remove-button" onClick={() => handleRemove(card._id)}>
                        Remove
                    </button>}
                    <div className="card-modal-submit-button">
                        <button type="button" onClick={handleCancel}>Cancel</button>
                        <button type="submit" className="submit-button">
                            {card?.id ? 'Save Changes' : 'Add Card'}
                        </button>
                    </div>

                </div>
            </form>
        </div>
    );
}

export default CardModal;