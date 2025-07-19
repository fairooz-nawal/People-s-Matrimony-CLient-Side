import React from 'react';
import PaymentForm from './PaymentForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useParams } from 'react-router';

const CheckOut = () => {
    const stripePromise = loadStripe(import.meta.env.VITE_payment_key);
    const {id} = useParams();
    return (
        <div>
            <Elements stripe={stripePromise}>
                <PaymentForm id={id}></PaymentForm>
            </Elements>
        </div>
    );
};

export default CheckOut;