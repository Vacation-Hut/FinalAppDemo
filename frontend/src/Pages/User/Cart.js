import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Checkout from "./Checkout";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCartItems(cart);
    const cost = cart.reduce((total, item) => total + item.price, 0);
    setTotalCost(cost);
  }, []);  

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem._id !== item._id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  
  const searchParams = new URLSearchParams(useLocation().search);
  const itemsParam = searchParams.get("items");

  if (itemsParam) {
    try {
      const parsedItems = JSON.parse(itemsParam);
      setCartItems(parsedItems);
    } catch (error) {
      console.error("Error parsing cart items JSON:", error);
    }
  }

  return (
    <div>
      <h1>Cart</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Image</TableCell>
            <TableCell>Package Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Members</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Actions</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {cartItems.map((item) => (
            <TableRow key={item._id}>
              <TableCell>
                <img src={item.image} alt={item.name} width={150} height={100} />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>${item.price}</TableCell>
              <TableCell>{item.count}</TableCell>
              <TableCell>{item.date}</TableCell>

              
              
              <TableCell>
                <button onClick={() => handleRemoveItem(item)}>Remove</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h2>Total Cost: ${totalCost}</h2>
      <Checkout cartItems={cartItems} totalCost={totalCost} />
    </div>
  );
};

export default CartPage;
