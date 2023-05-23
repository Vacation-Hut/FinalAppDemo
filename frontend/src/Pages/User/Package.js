import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import ResponsiveAppBar from "./Navbar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Typography, Button, Box, Container } from "@mui/material";
import "../../App.css"

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

  const handleAddToCart = (image) => {
    if (!date) {
      alert("Please select a date.");
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
        name: packageData.package,
        price: packageData.totalprice,
        count: 1,
        date: date.toLocaleDateString(),
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount((prevCount) => prevCount + 1);
      Navigate("/");
    }
  };

  const handleBookNow = (
    image,
    id,
    activityname,
    description,
    price,
    date
  ) => {
    handleAddToCart(image, id, activityname, description, price, date);
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
      <Container maxWidth="sm">
        <Box mt={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            {packageData.package}
          </Typography>
          {images.map((image) => (
            <img
              key={image.url}
              src={image.url}
              alt={packageData.package}
              className="shadow-1-strong mb-4 imagegallery"
            />
          ))}
          <Typography variant="body1" gutterBottom className="bodydescription">
            {packageData.description}
          </Typography>
        </Box>

        <fieldset>
          {packageData.details.map((activity, index) => (
            <div key={index} className="activity-cost">
              <Typography variant="body1" className="activity">
                {activity.activity}
              </Typography>
              <Typography variant="body1" className="cost">
                {activity.cost}
              </Typography>
            </div>
          ))}
        </fieldset>

        <Box mt={4}>
          <Typography variant="h6" gutterBottom>
            Calendar
          </Typography>
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
        </Box>

        <div className="actbtn">
          <Link to="/">
            <Button variant="outlined" className="actbtn1">
              Back to home
            </Button>
          </Link>

          <Button
            variant="contained"
            className="actbtn2"
            onClick={() =>
              handleAddToCart(
                images[0].url,
                packageData._id,
                packageData.package,
                packageData.totalprice,
                date
              )
            }
          >
            Add to book
          </Button>

          <Button
            variant="contained"
            className="actbtn2"
            onClick={() =>
              handleBookNow(
                images[0].url,
                packageData._id,
                packageData.package,
                packageData.totalprice,
                date
              )
            }
          >
            book now
          </Button>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default Package;
