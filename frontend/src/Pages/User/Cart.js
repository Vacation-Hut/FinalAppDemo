import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout"
import ResponsiveAppBar from './Navbar';
import Footer from './Footer';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

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
  console.log(totalCost);

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem._id !== item._id
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  console.log(cartItems);

  const location = useLocation();

  const handleToken = async (token, item, customerInfo) => {
    const response = await fetch("http://localhost:5000/dash/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items: [item],
        token: token,
        customerInfo: customerInfo,
      }),
    });

    const data = await response.json();
    console.log(data);

    if (data.success) {
      console.log("Payment succeeded");
      localStorage.removeItem("cart");
      setCartItems([]);
    } else {
      console.log("Payment failed");
    }
  };

  const searchParams = new URLSearchParams(location.search);
  const itemsParam = searchParams.get("items");

  if (itemsParam) {
    try {
      cartItems = JSON.parse(itemsParam);
    } catch (error) {
      console.error("Error parsing cart items JSON:", error);
    }
  }

  return (
    <div>
      <ResponsiveAppBar/>
      <div>
        <h1>Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item._id}>
                <h3>{item.packageName}</h3>
                <p>Price: ${item.price}</p>

                <button onClick={() => handleRemoveItem(item)}>Remove</button>
              </div>
            ))}
            <p>Total: ${totalCost}</p>
            <StripeCheckout
              stripeKey="pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS"
              token={(token) =>
                handleToken(token, cartItems, {
                  name: "John Doe",
                  email: "johndoe@example.com",
                  address: {
                    line1: "1234 Main Street",
                    line2: "",
                    city: "Anytown",
                    state: "CA",
                    postal_code: "12345",
                    country: "US",
                  },
                })
              }
              amount={totalCost * 100}
              name={cartItems.name}
              billingAddress
              shippingAddress
            >
              <button>Checkout</button>
            </StripeCheckout>
          </>
        )}
      </div>
<Footer/>
</div>
);
};

export default Cart;
