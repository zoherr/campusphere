"use client";
import React, { useEffect, useState } from "react";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useParams } from "react-router-dom";
import CheckoutForm from "@/components/checkoutForm";
import api from "@/utils/api";

const stripePromise = loadStripe(
  "pk_test_51PDPgFSI9RTm3dVERJ2VIbutGyGlV8GSWSNgGDMHo9RaJdI3wokMIJUpnupx0at22XnZIy0seedwaGKVK8bKB5FI00nHeLHfNO"
);

const Pay = () => {
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await api.post(`/fees/create-payment-intent/`);
        console.log(res);
        
        setClientSecret(res.clientSecret);
      } catch (err) {
        console.log(err);
      }
    };
    makeRequest();
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="pay  m-20">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};

export default Pay;
