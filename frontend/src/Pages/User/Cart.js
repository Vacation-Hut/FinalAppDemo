import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import Checkout from "./Checkout";
import ResponsiveAppBar from "./Navbar";
import Footer from "./Footer";
import '../../App.css'

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    setCartItems(cart);
    const cost = cart.reduce((total, item) => total + item.price * item.count, 0);
    setTotalCost(cost);
  }, []);  

  const handleRemoveItem = (item) => {
    const updatedCart = cartItems.filter((cartItem) => cartItem._id !== item._id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };
  const handleMembersChange = (e, item) => {
    const updatedCartItems = cartItems.map((cartItem) => {
      if (cartItem._id === item._id) {
        return { ...cartItem, count: e.target.value };
      }
      return cartItem;
    });
    setCartItems(updatedCartItems);
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
      <ResponsiveAppBar/>
      <div class="cart">
      <h1>Cart</h1>
      </div>
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
              <TableCell>{item.date}</TableCell>

              <TableCell>
                <input
                  type="number"
                  value={item.count}
                  onChange={(e) => handleMembersChange(e, item)}
                  min="1"
                />
              </TableCell>
              
              <TableCell>
                <button onClick={() => handleRemoveItem(item)}>Remove</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <h4>Total Cost: ${totalCost}</h4>
      <Checkout cartItems={cartItems} totalCost={totalCost} />
      <div className="cartfooter">
      <Footer/>
      </div>
    </div>
  );
};

export default CartPage;
