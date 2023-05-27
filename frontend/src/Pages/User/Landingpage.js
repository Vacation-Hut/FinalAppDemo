import React from 'react';
import "../../Edit.css";
import Packagedetails from "./Packagedetails";
import Footer from "./Footer";
import "./styles.css";
import Carousel from "react-spring-3d-carousel";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import Card from "./Card";
import CardNewsDemo from "./CardNewsDemo";
import { config } from "react-spring";
import Carroussel from "./Carroussel";



const LandingPage = () => {
  let cards = [
    {
      key: uuidv4(),
      content: <CardNewsDemo image ="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760039/Beach1_ujhudh.jpg" />
    },
    {
      key: uuidv4(),
      content: <CardNewsDemo image = "https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Pottery1_dseqya.jpg"/>
    },
    {
      key: uuidv4(),
      content: <CardNewsDemo image = "https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Museum1_aiokpw.jpg" />
    },
    {
      key: uuidv4(),
      content: <CardNewsDemo image = "https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760041/oil_making_center1_e0oqxq.png" />
    },
    {
      key: uuidv4(),
      content: <CardNewsDemo image = "https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Thinnai2_m4zpj0.jpg" />
    },
    {
      key: uuidv4(),
      content: <CardNewsDemo image = "https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Crafttary2_vtpjsn.jpg" />
    },
  
  ];

  return (
    <div className="landing-page">
      <header id="header">
    {/* BEGINING OF NAVBAR */}
    <nav id="navbar">
      <div className="nav--brand">
        <a href="#">
          <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1683827717/Dark_logo-removebg-preview_ube8bh.png" alt="Vacation Hut Logo" className='logo'/>
        </a>
        <div className="hamburger">
          <div className="line" />
          <div className="line" />
          <div className="line" />
        </div>
      </div>
      <ul className="nav--links">
        <li className="link-item">
          <a href="/">Home</a>
        </li>
        <li className="link-item">
          <a href="/login">Login</a>
        </li>
        <li className="link-item">
          <a href="/cart">Booking</a>
        </li>
      </ul>
    </nav>
    {/* END OF NAVBAR */}
    {/* BEGINING OF HERO SECTION */}
    <section id="hero">
      <h1 className="hero--header">Discover Amazing places in Jaffna</h1>
      
    </section>
    {/* END OF HERO SECTION */}
  </header>
  {/* END OF HEADER */}

<main>
  {/* BEGINING OF BENEFITS SECTION */}
  <section id="benefits">
      <h2 className="benefits--header">Why choose Vacation Hut</h2>
      <div className="benefit--cards">
      <div className="overlaycontainer benefit--card_item">
        <div className='overlaycontent'>
           <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1684473999/locationicon-removebg-preview_qkwzrj.png" alt="Location icon" class="icons"/>
           <p className='benefits--card_text'>At Vacation Hut, our dedication lies in providing our customers with truly authentic experiences in various destinations.</p>
        </div>
        <div className="overlay">
            <div className="overlaytext">we carefully select activities and attractions that capture the true spirit of the destination, guaranteeing our customers unforgettable moments and lasting memories.</div>
        </div>
      </div>

      <div className="overlaycontainer">
        <div className='overlaycontent'>
           <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685167568/holidaypackage_anlvb4.png" alt="Package icon" class="icons"/>
           <p className='benefits--card_text'>At Vacation Hut, we offering unique and attractive packages, allowing our customers to fully immerse themselves in the culture and essence of each place they visit.</p>
        </div>
        <div className="overlay">
            <div className="overlaytext">Our primary goal is to ensure that every aspect of our packages contributes to an authentic experience. With meticulous design and curation.</div>
        </div>
      </div>

      <div className="overlaycontainer">
        <div className='overlaycontent'>
           <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1684473645/transport_iccon_-removebg-preview_qcfdtk.png" alt="Transport icon" class="icons"/>
           <p className='benefits--card_text'>At Vacation Hut, we offer a variety of transportation options to cater to different needs and preferences, including bicycles, autos, cars, and vans.</p>
        </div>
        <div className="overlay">
            <div className="overlaytext">Whether you prefer the eco-friendly and leisurely pace of a bicycle ride, the convenience of an auto, the comfort and flexibility of a car, or the spaciousness of a van, we have got you covered.</div>
        </div>
      </div>

      <div className="overlaycontainer">
        <div className='overlaycontent'>
           <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1684473659/foodicon-removebg-preview_ohwv4e.png" alt="Food icon" class="icons"/>
           <p className='benefits--card_text'>At Vacation Hut, we offer exceptional food facilities, providing you with delicious meals for breakfast, lunch, and dinner.</p>
        </div>
        <div className="overlay">
            <div className="overlaytext">Join us in experiencing the culinary delights on offer and embark on a gastronomic adventure that will tantalize your taste buds and leave you craving for more.</div>
        </div>
      </div>
      </div>
    </section>
    {/* END OF BENEFITS SECTION */}
    {/* <Carousel/> */}
    <div className="background">
      <h1 className="whychoose packagealign">Where will you get Authentic Experience</h1>
      <Packagedetails/>
      </div>
      <div>
      <Carroussel
        cards={cards}
        height="500px"
        width="90%"
        margin="100px auto"
        offset={2}
        showArrows={false}
      />
      
    </div>
      <div>
        <Footer/>
      </div>
    
    </main>
    </div>
  );
};


export default LandingPage;
