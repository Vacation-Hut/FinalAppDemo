import React, { useState, useEffect } from "react";
import "../../App.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import ResponsiveAppBar from "./Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { WindowSharp } from "@mui/icons-material";
import StripeCheckout from "react-stripe-checkout";
import { setDate } from "date-fns";

function Package() {
  const Navigate = useNavigate();

  const [cartCount, setCartCount] = useState(0);
  const [images, setImages] = useState([{}]);
  const { id } = useParams();
  const [date, setDate] = useState(null);
  const [packageData, setPackageData] = useState({
    package: "",
    details: [
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
      { activity: "", cost: "" },
    ],
  });
  const handleDateChange = (date) => {
    setDate(date);
  };

  

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Perform API request to save check-in and check-out dates to the backend
    // ...

    // Reset check-in and check-out dates
    setDate(null);
  };

  const handleAddToCart = (image) => {
    if (!date ) {
      // Dates not selected, handle the error accordingly
      alert("Please select a date.");
      return;
    }

    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        image:image,
        _id: id,
        name: packageData.package,
        price: packageData.totalprice,
        count: 1,
        date: date.toLocaleDateString(),
       
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount((prevCount) => prevCount + 1);
      Navigate("/")
    }
    
  };
  
  const handleBookNow = (image, id, activityname, description, price,date) => {
    handleAddToCart(image, id, activityname, description, price,date);
    Navigate("/cart");
  };


  useEffect(() => {
    async function fetchPackageData() {
      try {
        const response = await axios.get(`http://localhost:5000/package/${id}`);
        setPackageData(response.data);
        setImages(response.data.images);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPackageData(id);
  }, [id]);

  return (
    <div className="App">
      <ResponsiveAppBar />
      <div>
        <h1 className="acthead">{packageData.package}</h1>
        {images.map((image) => {
          return (
            <img
              src={image.url}
              alt={packageData.package}
              class="shadow-1-strong mb-4 imagegallery"
            />
          );
        })}
        <p className="des">{packageData.description}</p>
      </div>

      <fieldset>
        {packageData.details.map((activity, index) => (
          <div key={index} className="activity-cost">
            <p className="activity">{activity.activity}</p>
            <p className="cost">{activity.cost}</p>
          </div>
        ))}
      </fieldset>
      <div>
        <h2>Calendar</h2>
        <form>
          <div>
            <label>your trip date:</label>
            <DatePicker
              selected={date}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            />
          </div>
        </form>
      </div>

      <div className="actbtn">
        <Link to="/">
          {" "}
          <button className="actbtn1">Back to home</button>
        </Link>
      
        <button
          className="actbtn2"
          onClick={() =>
            handleAddToCart(
              images[0].url,
              packageData._id,
              packageData.package,
              packageData.totalprice,
             date,
            )
          }
        >
          {" "}
          Add to book
        </button>
        
        <button
                    className="actbtn2"
                    onClick={() =>
                      handleBookNow(
                        images[0].url,
                        packageData._id,
                        packageData.package,
                        packageData.totalprice,
                       date,
                      )
                    }
                  >
            book now
          </button>
      </div>
      <Footer />
    </div>
  );
}

export default Package;
