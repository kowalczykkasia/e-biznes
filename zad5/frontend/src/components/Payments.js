import React, { useState } from 'react';
import axios from 'axios';

const Payments = () => {
    const [amount, setAmount] = useState('');
    const [currency, setCurrency] = useState('PLN'); // Default currency
    const [method, setMethod] = useState('credit_card'); // Default payment method
    const [status, setStatus] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const paymentData = {
            amount: parseFloat(amount), // Ensure the amount is a number
            currency,
            method
        };

        axios.post('http://localhost:8080/api/payments', paymentData)
            .then(response => {
                setStatus('Payment successful');
            })
            .catch(error => {
                setStatus('Error processing payment');
                console.error(error);
            });
    };

    return (
        <div>
            <h1>Payments</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Amount:</label>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Payment amount"
                        required
                    />
                </div>

                <div>
                    <label>Currency:</label>
                    <select value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                        <option value="PLN">PLN</option>
                        <option value="USD">USD</option>
                        <option value="EUR">EUR</option>
                    </select>
                </div>

                <div>
                    <label>Payment Method:</label>
                    <select value={method} onChange={(e) => setMethod(e.target.value)} required>
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="bank_transfer">Bank Transfer</option>
                    </select>
                </div>

                <button type="submit">Submit Payment</button>
            </form>

            {status && <p>{status}</p>}
        </div>
    );
};

export default Payments;
