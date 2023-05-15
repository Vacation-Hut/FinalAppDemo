import { Grid, Paper } from '@material-ui/core';
import React, { useState, useEffect } from "react";
import styles from "../../App.css";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Packagedetails = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Initialize cart count to zero
  const Navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/allpackage", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        const allImages = data.data.map((packages) => packages.images[0].url);
        setImages(allImages);
      });
  }, []);

  const handleAddToCart = (id, activityname, description, price) => {
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        _id: id,
        name: activityname,
        description: description,
        price: price,
        count: 1,
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));

      setCartCount((prevCount) => prevCount + 1); // Increment the cart count by 1
    }
  };

  return (
    <div>
      {images.map((image, index) => {
        const activity = data[index];
        return (
          <div key={index} className="activity-card">
            <Grid container spacing={5}>
          <Grid item xs={12} md={5}>
            <Link to={`/package/${activity._id}`}>
            <img
             src={image}
             alt={`Image ${index}`}
             className="activity-image"
            />
            </Link>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className="activity-details">
            <h4>{activity.package}</h4>
             <span>{activity.totalprice}</span>
            <div>
            <button className="booksbtn">Booking now</button>
            <button
            className="booksbtn booksbtn1"
            onClick={() =>
            handleAddToCart(
              activity._id,
              activity.activityname,
              activity.description,
              activity.price
            )
            }
            >
               Add to cart
            </button>
           </div>
           </div>
          </Grid>
          </Grid>
            </div>
             );
             })}
           </div>
      );
    };

export default Packagedetails;
