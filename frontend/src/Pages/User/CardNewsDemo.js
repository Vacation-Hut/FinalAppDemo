import React, { useState, useEffect } from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ChevronRightRounded from "@material-ui/icons/ChevronRightRounded";
import Star from "./assets/star";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import "./styles.css";



const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 304,
    width: 400,
    margin: "auto",
    boxShadow: '5px 10px #888888',
    borderRadius: 30
  },
  content: {
    padding: 24
  },
  cta: {
    marginTop: 24,
    textTransform: "initial"
  }
}));

 const CardNewsDemo = React.memo(function CardNews({ activeIndex = 0,image }) {
  const styles = useStyles();
  const n = 6;
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartcount, setCartCount] = useState(0); // Initialize cart count to zero
  const [date, setDate] = useState(null);
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
  const handleDateChange = (date) => {
    setDate(date);
  };
  const handleAddToCart = (image, id, activityname, totalprice) => {
    if (!date) {
      // Dates not selected, handle the error accordingly
      alert("Please select check-in and check-out dates.");
      return;
    }
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];
    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        image: image,
        _id: id,
        name: activityname,
        price: totalprice,
        count: 1,
        date: date.toLocaleDateString(),
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));

      setCartCount((prevCount) => prevCount + 1); // Increment the cart count by 1
    }
  };

  const handleBookNow = (image, id, activityname, description, price, date) => {
    handleAddToCart(image, id, activityname, description, price, date);
    Navigate("/cart");
  };
  


  return (
    <Card>
      
      <CardMedia
        style={{
          height: "300px",
          width: "500px",
          filter: activeIndex !== 0 ? "blur(2px)" : "none"
        }}
        image={image}
         
      />
      

      <CardContent className={styles.content}>
        {/* {[...Array(n)].map((e, i) => (
          <span key={i}>
            <Star height="20px" />
          </span>
        ))} */}
        <div className="packagecarousel">
        <h3>Packages</h3>

                 <div>
                      <h4>Calendar</h4>
                      <form>
                        <div>
                          <label>Date:</label>
                          <DatePicker
                            selected={date}
                            onChange={handleDateChange}
                            dateFormat="dd/MM/yyyy"
                          />
                        </div>
                      </form>
                    </div>
                    <div>
                    <button
                      className="booksbtn booksbtn1"
                      onClick={() =>
                        handleBookNow(
                          // image,
                          // activity._id,
                          // activity.package,
                          // activity.totalprice,
                          date
                        )
                      }
                    >
                      book now
                    </button>

                    <button
                      className="booksbtn booksbtn1"
                      onClick={() =>
                        handleAddToCart(
                          // image,
                          // activity._id,
                          // activity.package,
                          // activity.totalprice,
                          date
                        )
                      }
                    >
                      Add to cart
                    </button>
                    </div>
        <Button color={"primary"} fullWidth className={styles.cta}>
          View More <ChevronRightRounded />
        </Button>
        </div>
      </CardContent>
    </Card>
  );
});

export default CardNewsDemo;

