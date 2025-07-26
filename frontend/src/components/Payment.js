import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/Payment.css'; // Import the CSS file

const Payment = () => {
    const [amount, setAmount] = useState("");
    const navigate = useNavigate();

    const handlePayment = async () => {
        // Validate exact amount
        if (parseFloat(amount) !== 199) {
            alert("Please pay the exact amount of ₹199");
            return;
        }

        try {
            const response = await fetch("/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: amount * 100 }), // Convert to smallest currency unit (paisa)
            });

            if (!response.ok) {
                throw new Error("Failed to create payment order");
            }

            const orderData = await response.json();

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: orderData.amount,
                currency: orderData.currency,
                name: "ShubhMilan",
                description: "Premium Feature Access",
                order_id: orderData.id,
                handler: function (response) {
                    alert(`Payment successful: ${response.razorpay_payment_id}`);
                    console.log(response);
                    
                    // Navigate to profile page after successful payment
                    navigate("/profile");
                },
                prefill: {
                    name: "Sarang Rai",
                    email: "sarang2452@gmail.com",
                    contact: "8839022132",
                },
                theme: {
                    color: "#3399cc",
                },
                modal: {
                    ondismiss: function() {
                        console.log("Payment modal closed without completion");
                    }
                }
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Payment error:", error);
            alert("Something went wrong with the payment. Please try again.");
        }
    };

    return (
        <div className="payment-container">
            <div className="payment-wrapper">
                <h2 className="payment-title">Payment for ShubhMilan Feature</h2>
                <div className="payment-amount-section">
                    <label htmlFor="amount" className="payment-label">Amount (Compulsory ₹199)</label>
                    <input
                        id="amount"
                        type="number"
                        placeholder="Enter Amount (₹199)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="payment-input"
                        min="199"
                        max="199"
                    />
                    {amount !== "199" && amount !== "" && (
                        <p className="payment-error-message">
                            Please enter the exact amount of ₹199
                        </p>
                    )}
                </div>
                <button 
                    onClick={handlePayment}
                    disabled={amount !== "199"}
                    className="payment-button"
                >
                    Pay Now
                </button>
            </div>
        </div>
    );
};

export default Payment;