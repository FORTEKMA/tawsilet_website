import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./PaymentForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is a public sample test API key.
// Don’t submit any personally identifiable information in requests made with this key.
// Sign in to see your own test API key embedded in code samples.
const stripePromise = loadStripe(
  "pk_test_51NXhClKWwyvkxWsP4PvxjH7u7ZMiDFtD9nNTMIpnOW76tsM9DpEfeuI4VPs3uFFJrEwnVGHGE15qlYew4LU84HP400VD8JeI0E"
);

export default function StripeContainer() {
  const [clientSecret, setClientSecret] = useState(
    "pi_3NdV8kKWwyvkxWsP14sPYghD_secret_sk_test_51NXhClKWwyvkxWsPNopDiQZlx0k6x3fnvwn2IdSyAFO6cg8oHbvHRGYaZnFZX0Nv1ArtQax6HPhcDl9aOgPCW3zK00QGhiDPJh"
  );

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   fetch("/create-payment-intent", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => setClientSecret(data.clientSecret));
  // }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}
