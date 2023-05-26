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
  const [count ,setCount] = useState();

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
  const handleMembersChange = (e) => {
    const selectedCount = parseInt(e.target.value);
    setCount(selectedCount);
  };
  

  
  const handleAddToCart = (image) => {
    if (!date || !count) {
      // Dates not selected, handle the error accordingly
      alert("Please select a date and members.");
      return;
    }
    let additionalCost = 0;
    if (count > 8) {
      const extraMembers = count - 8;
      additionalCost = Math.ceil(extraMembers / 5) * 10;
    }
  
    const totalPrice = packageData.totalprice + additionalCost;
    const cart = localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [];

    const duplicates = cart.filter((cartItem) => cartItem._id === id);

    if (duplicates.length === 0) {
      const activityToAdd = {
        image:image,
        _id: id,
        name: packageData.package,
        price: totalPrice,
        count: count,
        date: date.toLocaleDateString(),
       
      };

      cart.push(activityToAdd);

      localStorage.setItem("cart", JSON.stringify(cart));
      setCartCount((prevCount) => prevCount + 1);
      Navigate("/")
    }
    
  };
  
  const handleBookNow = (image, id, activityname, description, price) => {
    if (!date || !count) {
      alert("Please select a date and enter the number of members.");
      return;
    }
  
    try {
      handleAddToCart(image, id, activityname, description, price, date);
      Navigate("/cart");
    } catch (err) {
      throw err;
    }
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
        <div>
                 <label>Members</label> 
                <input
                  type="number"
                  value={count}
                  onChange={(e) => handleMembersChange(e,count)}
                  min="1"
                /><br></br>
                 {count > 8 && <span className="alert">More than 8 People for every additional 5 people we pay 5$.  .</span>}
                    </div>

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
