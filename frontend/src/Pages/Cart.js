import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  
    return (
      <div>
        <h1>Cart</h1>
        {cartItems.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <button onClick={() => handleRemoveItem(item)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Your cart is empty.</p>
        )}
        {cartItems.length > 0 && (
          <div>
            <p>Total: {cartItems.reduce((sum, item) => sum + item.price, 0)}</p>
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        )}
      </div>
    );
  };
  

export default Cart;
