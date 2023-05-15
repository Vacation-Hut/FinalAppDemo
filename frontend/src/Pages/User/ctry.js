import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useStripe, useElements, CardElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from '@stripe/stripe-js';

import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    setCartItems(cart);
  }, []);

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem._id !== item._id
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/orders", {
        items: cartItems,
      });

      console.log("Order details:", response.data);
      localStorage.removeItem("cart");
      navigate("/");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const itemsParam = searchParams.get("items");

  useEffect(() => {
    if (itemsParam) {
      try {
        const items = JSON.parse(itemsParam);
        setCartItems(items);
      } catch (error) {
        console.error("Error parsing cart items JSON:", error);
      }
    }
  }, [itemsParam]);

  useEffect(() => {
    let totalPrice = 0;
    let productName = "";
    for (let i = 0; i < cartItems.length; i++) {
      totalPrice += cartItems[i].price * cartItems[i].count;
      productName += cartItems[i].name;
      if (i !== cartItems.length - 1) {
        productName += ", ";
      }
    }

    setProduct({
      name: productName,
      price: totalPrice,
    });
  }, [cartItems]);

  const [product, setProduct] = useState({
    name: "Product",
    price: 10,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a payment intent on the server
      const response = await axios.post("http://localhost:5000/orders", {
        amount: product.price * 100,
        name: event.target.name.value,
        email: event.target.email.value,
      });
      const { clientSecret } = response.data;

      // Confirm the payment using the client secret and card details
      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: event.target.name.value,
              email: event.target.email.value,
            },
          },
        }
      );
      if (error) {
        console.error("Error processing payment:", error);
      } else {
        console.log("Payment successful!");
        handleCheckout();
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  return (
    <div>
      <h1>Cart</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            <Link to={`/product/${
item._id
}`}>
{item.name} </Link> {" "} x {item.count} - ${item.price * item.count}{" "}
<button onClick={() => handleRemoveItem(item)}>Remove</button>
</li>
))}
</ul>
<h3>Total: ${product.price}</h3>

<form onSubmit={handleSubmit}>
  <label>
    Name:
    <input type="text" name="name" required />
  </label>{" "}
  <br />
  <label>
    Email:
    <input type="email" name="email" required />
  </label>{" "}
  <br />
  <div>
  <label>
    Card details:
    <CardElement />
  </label>{" "}
  </div>
  <br />
  <button type="submit" disabled={!stripe}>
    Pay ${product.price}
  </button>
</form>
</div>
);
};


const stripePromise = loadStripe("pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS");

const Checkout = () => {
  return (
    <Elements stripe={stripePromise}>
      <Cart />
    </Elements>
  );
};


export default Checkout;






