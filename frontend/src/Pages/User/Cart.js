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

  useEffect(() => {
    const cart = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];

    setCartItems(cart);
  }, []);

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter(
      (cartItem) => cartItem._id !== item._id
    );
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const handleCheckout = () => {
    const query = `?items=${JSON.stringify(cartItems)}`;
    const url = `/checkout${query}`;
    window.location.href = url;
    // handle checkout
  };
  const location = useLocation();
  const [product, setProduct] = useState({
    name: "Product",
    price: 10,
    totalPrice: 0
  });

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
      localStorage.removeItem('cart');
      setCartItems([]);
    } else {
      console.log("Payment failed");
    }
  };


  const searchParams = new URLSearchParams(location.search);
  const itemsParam = searchParams.get('items');


  if (itemsParam) {
    try {
      cartItems = JSON.parse(itemsParam);
    } catch (error) {
      console.error('Error parsing cart items JSON:', error);
    }
  }

  const handleProductUpdate = (items) => {
    let totalPrice = 0;
    let productName = "";
    for (let i = 0; i < items.length; i++) {
      totalPrice += items[i].price * items[i].count;
      productName += items[i].name;
      if (i !== items.length - 1) {
        productName += ", ";
      }
    }

    setProduct({
      name: productName,
      price: totalPrice,
      totalPrice: totalPrice
    });
  };

  useEffect(() => {
    if (cartItems && cartItems.length > 0) {
      handleProductUpdate(cartItems);
    }
  }, []);

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
<h3>{item.name}</h3>
<p>Price: ${item.price}</p>
<p>Quantity: {item.count}</p>
<button onClick={() => handleRemoveItem(item)}>Remove</button>
</div>
))}
<p>Total: ${product.totalPrice}</p>
<StripeCheckout
stripeKey="pk_test_51N3lwjH8XjLC6H8P6MVqSi1zNr9Ud4vPRXYaAdSIyAKVuDfKXqZkmMo5QsGIvNnOYwg7gW6JL6Yx3ROs4kRtJuns00uuIY19pS"
token={(token) => handleToken(token, cartItems, {
name: "John Doe",
email: "johndoe@example.com",
address: {
line1: "1234 Main Street",
line2: "",
city: "Anytown",
state: "CA",
postal_code: "12345",
country: "US"
}
})}
amount={product.price * 100}
name={product.name}
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
