import React from 'react';
import "../../Edit.css";
import Carousel from './inspirationcarosel';
import Packagedetails from "./Packagedetails";
import Footer from "./Footer";




const LandingPage = () => {

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
        <div className="benefit--card_item">
          <img className='icons' src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1684473999/locationicon-removebg-preview_qkwzrj.png" alt="welcome" />
          <p className="benefits--card_text">At Vacation Hut, our dedication lies in providing our customers with truly authentic experiences in various destinations. We understand the significance of offering unique and attractive packages, allowing our customers to fully immerse themselves in the culture and essence of each place they visit. Our primary goal is to ensure that every aspect of our packages contributes to an authentic experience. With meticulous design and curation, we carefully select activities and attractions that capture the true spirit of the destination, guaranteeing our customers unforgettable moments and lasting memories. </p>
        </div>
        <div className="benefit--card_item">
          <img className='icons' src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1684473645/transport_iccon_-removebg-preview_qcfdtk.png" alt="welcome" />
          <p className="benefits--card_text">At Vacation Hut, we go the extra mile to ensure a seamless travel experience for our customers by providing convenient transport facilities. We offer a variety of transportation options to cater to different needs and preferences, including bicycles, autos, cars, and vans. We understand that choosing the right mode of transport is essential in enhancing the overall journey. Whether you prefer the eco-friendly and leisurely pace of a bicycle ride, the convenience of an auto, the comfort and flexibility of a car, or the spaciousness of a van, we have got you covered.</p>
        </div>
        <div className="benefit--card_item">
          <img className='icons' src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1684473659/foodicon-removebg-preview_ohwv4e.png" alt="welcome" />
          <p className="benefits--card_text">At Vacation Hut, we understand the importance of culinary delights in enhancing your travel experience. That's why we offer exceptional food facilities, providing you with delicious meals for breakfast, lunch, and dinner. Join us in experiencing the culinary delights on offer and embark on a gastronomic adventure that will tantalize your taste buds and leave you craving for more.</p>
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
        <Footer/>
      </div>

    
    </main>
    </div>
  );
};


export default LandingPage;
