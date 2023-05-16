import React, { useState, useEffect } from "react";
import "../../App.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import ResponsiveAppBar from "./Navbar";
import MyCalendar from "./Calendor";

function Package() {
    const Navigate = useNavigate;
    const [images, setImages] = useState([{}]);
    const {id} = useParams()
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
          { activity: "", cost: "" }
        ],
      });


//   const handleAddToCart = () => {
//     const cart = localStorage.getItem("cart")
//       ? JSON.parse(localStorage.getItem("cart"))
//       : [];

//     const duplicates = cart.filter((cartItem) => cartItem._id === id);

//     if (duplicates.length === 0) {
//       const activityToAdd = {
//         _id: id,
//         name: activityname,
//         description: description,
//         price: price,
//         count: 1,
//       };

//       cart.push(activityToAdd);

//       localStorage.setItem("cart", JSON.stringify(cart));

//       setCartCount((prevCount) => prevCount + 1); // Increment the cart count by 1
//     }
//   };

  useEffect(() => {
    async function fetchPackageData() {
      try {
        const response = await axios.get(`http://localhost:5000/package/${id}`);
        setPackageData(response.data);
        setImages(response.data.images)
      } catch (error) {
        console.error(error);
      }
    }

    fetchPackageData(id);
  }, [id]);
 

  return (
    <div className="App">
      <ResponsiveAppBar/>
      <div>
        <h1 className="acthead">{packageData.package}</h1>
        {images.map((image) => {
       return (
          
            <img
              src={image.url}
              alt={packageData.package}
              class="shadow-1-strong mb-4 imagegallery"
            />
              
        )})}
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

      <div className="actbtn">
        <Link to="/">
          {" "}
          <button className="actbtn1">Back to home</button>
        </Link>

        {/* <button className="actbtn2" onClick={handleAddToCart}>
          {" "}
          Add to book
        </button> */}
        <button className="actbtn3">Booking now</button>
      </div>
      <MyCalendar/>
      <Footer/>
    </div>
  );
}

export default Package;
