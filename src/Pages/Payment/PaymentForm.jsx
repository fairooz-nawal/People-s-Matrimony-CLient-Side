import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useContext } from 'react';
import Swal from "sweetalert2";
import { ContextAPI } from '../../Component/ContextAPI/AuthProvider';
import axios from 'axios';
import useAxiosSecure from '../../Component/Hooks/useAxiosSecure';
const PaymentForm = ({ id }) => {
    const axiosSecure = useAxiosSecure();
    const { users } = useContext(ContextAPI);
    const currentEmail = users?.email;
    const stripe = useStripe();
    const elements = useElements();

    const amount = 5;
    const handleSubmitForm = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return
        }
        const card = elements.getElement(CardElement);
        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if (error) {
            Swal.fire({
                title: error.code,
                text: error.message,
                icon: "info",
            });
        } else {
            console.log(paymentMethod)
        }

        //create payment intent

        const res = await axiosSecure.post('/create-payment-intent', {
            amount: amount,
            BioDataId: id,
            email: currentEmail
        });

        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: users?.displayName,
                    email: currentEmail,
                },
            }
        })

        if (result.error) {
            Swal.fire({
                title: result.error.code,
                text: result.error.message,
                icon: "info",
            });
        }
        else {
            console.log(result);
            if (result.paymentIntent.status === "succeeded") {
                Swal.fire({
                    title: "Success!",
                    text: "Your Payment is done Successfully",
                    icon: "success",
                });

                // Save payment details to backend
               const res = await axiosSecure.post('/save-payment', {
                    biodataId: id,
                    email: currentEmail,
                    amount: amount,
                    paymentIntentId: result.paymentIntent.id
                });

                console.log(res.data);

            }
        }
        console.log("payment intent", res.data.clientSecret);
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-amber-500 to-pink-500">
            <form
                onSubmit={handleSubmitForm}
                className="w-full max-w-md bg-white shadow-2xl rounded-xl p-8 space-y-6"
            >
                <h2 className="text-3xl font-bold text-center text-amber-600">
                    Request Contact Info
                </h2>

                <div>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" defaultValue={id} disabled={true} required />
                </div>
                <div>
                    <input type="text" className="bg-gray-50 border border-gray-300 text-gray-600 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5" defaultValue={currentEmail} disabled={true} required />
                </div>

                <CardElement
                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5'
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },

                        },
                    }}
                />
                <button type="submit" disabled={!stripe} className='w-full bg-gradient-to-r from-amber-500 to-pink-500 text-xl font-bold text-white py-2 px-4 rounded'>
                    Pay For Contact Info
                </button>
            </form>
        </div>
    );
};

export default PaymentForm;