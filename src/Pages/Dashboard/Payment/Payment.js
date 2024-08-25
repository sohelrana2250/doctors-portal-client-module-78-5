import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import { useLoaderData } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Payment = () => {
  const booking = useLoaderData();
  const { treatment, price, appointmentDate, slot } = booking;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-lg shadow-lg bg-white p-6 rounded-lg">
        <h3 className="text-3xl font-serif mb-4">Payment for {treatment}</h3>
        <p className="text-xl font-serif mb-4">
          Please pay <strong>${price}</strong> for your appointment on{" "}
          {appointmentDate} at {slot}
        </p>
        <div className="w-full my-6">
          <Elements stripe={stripePromise}>
            <CheckoutForm booking={booking} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Payment;
