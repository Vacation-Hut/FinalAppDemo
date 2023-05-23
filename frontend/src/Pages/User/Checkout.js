import React, { useState ,useEffect } from "react";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Navigate, useNavigate } from "react-router-dom";

const useStyles = makeStyles({
  cardElement: {
    width: "500px",
  },
});

const stripePromise = loadStripe("pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS");

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [country, setCountry] = useState("");
  const [nic, setNic] = useState("");
  const [passportno, setPassport] = useState("");
  const [isOpen, setIsOpen] = useState(false);
const [cartItems ,setCartItems] = useState([])
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [totalCost, setTotalCost] = useState(0);
const Navigate = useNavigate()
  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCartItems(cart);
    const cost = cart.reduce(
      (total, item) => total + item.price * item.count,
      0
    );
    setTotalCost(cost);
    
  }, []);

  const handleToken = async (event) => {
    
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { token, error } = await stripe.createToken(cardElement);
    
    if (error) {
      console.error("Error creating token:", error);
    } else {
      const response = await fetch("http://localhost:5000/dash/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cartItems,
          total:totalCost,
          token: token,
          customerInfo: {
            name: name,
            email: email,
            phonenumber: phonenumber,
            country: country,
            passportno: passportno,
            nic: nic,
          },
        }),
      });

      const data = await response.json();
 
      if (data.success) {
        const orderID = data.orderID
        localStorage.removeItem("cart");
        setCartItems([]);
        setIsOpen(true);
      Navigate(`/receipt/${orderID}`)
      } else {
        alert("Payment failed");
      }
    }
  };

  return (
    <div>
      <h1>Checkout</h1>
      <form onSubmit={handleToken}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone Number"
          value={phonenumber}
          onChange={(e) => setPhonenumber(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="NIC"
          value={nic}
          onChange={(e) => setNic(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Passport No"
          value={passportno}
          onChange={(e) => setPassport(e.target.value)}
          required
        />
        <CardElement className={classes.cardElement} />
        <button type="submit">Pay</button>
      </form>
      
    </div>
  );
};

const StripeCheckout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutForm />
  </Elements>
);

export default StripeCheckout;
