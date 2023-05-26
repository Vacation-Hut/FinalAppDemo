import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  CardElement,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { makeStyles } from "@material-ui/core/styles";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { CountryDropdown } from "react-country-region-selector";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import Validation from "../../Validation/checkoutvalidate";

const useStyles = makeStyles({
  cardElement: {
    width: "500px",
  },
});

const stripePromise = loadStripe(
  "pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS"
);

const CheckoutForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const Navigate = useNavigate();
  const [phonenumber, setPhonenumber] = useState("");
  const [country, setCountry] = useState("");
  const [nic, setNic] = useState("");
  const [passportno, setPassport] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const classes = useStyles();
  const [totalCost, setTotalCost] = useState(0);
  const { id } = useParams();
  const [error, setError] = useState({});


  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCartItems(cart);
    const cost = cart.reduce(
      (total, item) => total + item.price,0
    );
    setTotalCost(cost);
  }, []);
  const handleNumberchange = (value) => {
    setPhonenumber(value);
    
  };
  const handleCountrychange = (value) => {
    setCountry(value);
  };
  const handleToken = async (event) => {
    event.preventDefault();
    const validationErrors = Validation(name, email, passportno, nic, phonenumber);
    setError(validationErrors);
  
    const cardElement = elements.getElement(CardElement);
    const { token, error: tokenError } = await stripe.createToken(cardElement);
  
    if (tokenError) {
      console.error("Error creating token:", tokenError);
      // Handle the error if needed
    }
  
    const response = await fetch("http://localhost:5000/dash/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: cartItems,
        total: totalCost,
        token: token.id, // Use token.id instead of token
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
      const orderID = data.orderID;
      localStorage.removeItem("cart");
      setCartItems([]);
      setIsOpen(true);
      Navigate(`/receipt/${orderID}`);
    } else {
      alert("Payment failed");
    }
  };
  
  

  const renderFields = () => {
    if (country === "LK") {
      return (
        <div>
          <input
            type="text"
            placeholder="NIC"
            value={nic}
            onChange={(e) => setNic(e.target.value)}
          
          />
          {error.nic && <span className="text-danger"> {error.nic}</span>}
        </div>
      );
    } else {
      return (
        <div>
          <input
            type="text"
            placeholder="Passport No"
            value={passportno}
            onChange={(e) => setPassport(e.target.value)}
            
          />
          {error.passportno && (
            <span className="text-danger"> {error.passportno}</span>
          )}
        </div>
      );
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
          
        />
        {error.name && <span className="text-danger"> {error.name}</span>}
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          
        />
        {error.email && <span className="text-danger"> {error.email}</span>}
        <PhoneInput
          defaultCountry="SL" // Set the default country
          value={phonenumber}
          onChange={handleNumberchange}
          flags={false} // Disable country flags
        />
        {error.phonenumber && (
          <span className="text-danger"> {error.phonenumber}</span>
        )}
        <CountryDropdown
          value={country}
          onChange={(val) => handleCountrychange(val)}
          valueType="short"
          priorityOptions={["US", "GB", "CA", "LK"]}
          key={country} // Optional: Set priority options
        />
        {renderFields()}
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
