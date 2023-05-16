import React, { useState, useEffect } from "react";
import styles from "../../App.css";
import { useParams, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./Navbar";
import AppCarousel from "./Carousel";
import Whychoose from "./Whychoose";
import Packagedetails from "./Packagedetails";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [cartCount, setCartCount] = useState(0); // Initialize cart count to zero
  const Navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    const token = localStorage.getItem("token");
    // const userId = localStorage.getItem("userId");
    if (token && userId) {
      fetch(`http://localhost:5000/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setUserName(data.user.name);
          
        
        })
        .catch((error) => console.log(error));
    }
  }, [userId]);

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
    console.log(images)
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
  

  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") != null);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
  }

  function handleLogin() {
    navigate("/login");
  }
  
    

  return (
    <div className="App">
      <ResponsiveAppBar/>
      {/* {isOpen && <Modal setIsOpen={setIsOpen} />} */}
     <AppCarousel/>
      <h1 class="whychoose">Why Choose Vacation Hut</h1>
      <Whychoose/>
      <h1 class="whychoose">Where will you get Authentic Experience</h1>
      <Packagedetails/>
      <Footer/>
    </div>
    // <main>
    //   <button className={styles.primaryBtn} onClick={() => setIsOpen(true)}>
    //     Login
    //   </button>
    //   {isOpen && <Modal setIsOpen={setIsOpen} />}
    // </main>
  );
};

export default Home;
