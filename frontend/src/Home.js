import React, { useState, useEffect } from "react";
import styles from "./App.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from "./Modal.js";

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { faInstagram, faFacebookF, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons'




const Home = () => {
  const [data, setData] = useState([]);
  const [images, setImages] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/allactivity", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        const allImages = data.data.map((activity) => activity.images.url);
        setImages(allImages);
      });
  }, []);
 
  return (
    
    <div className="App">
       
        <nav className="navbar navbar-expand-lg navbackground">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <a className="nav-link font" href="#">
                    <i>Vacation Hut</i>
                  </a>
              </li>
                <li className="nav-item item2">
                  <a className="nav-link font" href="/">
                    Home
                  </a>
                </li>
                
              <form className="d-flex item3">
                <input
                  className="form-control me-2 btn searchbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn font searchbar searchicon" type="submit">
                {/* <FontAwesomeIcon icon="fas fa-search" /> */}
                <FontAwesomeIcon icon={faSearch} />
                </button>
              </form>
              
              <li className="nav-item item4">
                  <a className="nav-link font" href="#">
                    Add to book
                    <FontAwesomeIcon icon={faBook} className="bookicon"/>
                  </a>
                </li>
                <li className="nav-item item4">
                 
                  {/* <a className="nav-link font" onClick={() => setIsOpen(true)}> */}
                  <a className="nav-link font" href="/Login">
                  Login
                  </a>
              </li>
                </ul>
            </div>
          </div>
        </nav>
        {/* {isOpen && <Modal setIsOpen={setIsOpen} />} */}
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682835313/Thinnai1_ky38de.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Thinnai Organic Farm</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760041/Pottery2_qb6q2n.jpg"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Pottery Center</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Museum1_aiokpw.jpg"
          alt="Fifth slide"
        />

        <Carousel.Caption>
          <h3>Sivapoomi Museum</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760041/oil_making_center2_gvgm6b.jpg"
          alt="Seventh slide"
        />

        <Carousel.Caption>
          <h3>Oil Making Center</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Beach2_uvkmwo.jpg"
          alt="Nineth slide"
        />

        <Carousel.Caption>
          <h3>Beach Side</h3>
        </Carousel.Caption>
      </Carousel.Item>
      
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Crafttary1_yjxv1q.jpg"
          alt="Eleventh slide"
        />

        <Carousel.Caption>
          <h3>Crafttary Shop</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Thinnai2_m4zpj0.jpg"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Thinnai Organic Farm</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Pottery1_dseqya.jpg"
          alt="Fourth slide"
        />

        <Carousel.Caption>
          <h3>Pottery Center</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Museum2_dczixq.jpg"
          alt="Sixth slide"
        />

        <Carousel.Caption>
          <h3>Sivapoomi Museum</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760041/oil_making_center1_e0oqxq.png"
          alt="Eighth slide"
        />

        <Carousel.Caption>
          <h3>Oil Making Center</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760039/Beach1_ujhudh.jpg"
          alt="Tenth slide"
        />

        <Carousel.Caption>
          <h3>Beach Side</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682760040/Crafttary2_vtpjsn.jpg"
          alt="Twelvth slide"
        />

        <Carousel.Caption>
          <h3>Crafttary Shop</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <h1 class="whychoose">Why Choose Vacation Hut</h1>
    <div class="flex-container">
  <div class="flex-item-leftside">
    <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1683047660/promo_ny2mz2.png" alt="Vacation Hut Promotion"></img>
  </div>
  <div class="flex-item-rightside">
  <p>We can provide valuable insights and recommendations for travelers looking to explore the area beyond the typical tourist hotspots.</p>
    <p>This website can help travelers connect more deeply with the local culture, have a more unique and memorable travel experience, and support sustainable tourism practices.</p>
    <p>This websites for tours often provide opportunities for cultural immersion, such as home-stays, cooking classes, or other hands-on experiences. This can lead to a deeper understanding and appreciation of the local culture.</p>
    <p>We can provide this facilities</p>
    <p><FontAwesomeIcon icon={faMapMarkerAlt} /><span className="promo">Show the authentic experience places</span></p>
    <p><FontAwesomeIcon icon={faUser} /><span className="promo">Guider facility</span></p>
    <p><FontAwesomeIcon icon={faBed} /><span className="promo">Accommodation facility</span></p>
    <p><FontAwesomeIcon icon={faBus} /><span className="promo">Transport facility</span></p>
  </div>
</div>
<h1 class="whychoose">Where will you get Authentic Experience</h1>

{/* image gallery  */}

<div class="row">
{images.map((image, index) => {
  const activity = data[index];
  return (
    <div class="col-lg-4 col-md-12 mb-4 mb-lg-0" key={index}>
      <Link to={`/dash/activity/${activity._id}`}>
        <img
          src={image}
          alt={`Image ${index}`}
          class="shadow-1-strong mb-4 imagegallery"
        />
      </Link>
      <div className="small">
        <span>{activity.activityname}</span>
        <span className="pay">{activity.price}</span><br></br><br></br>
        <button className="booksbtn">Booking now</button>
        <button className="booksbtn booksbtn1">Add to book</button><br></br><br></br>
        
      </div>
      
    </div>
  );
})} 
</div>
<nav className="navbar navbar-expand-lg navbackground item5">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                  <a className="nav-link font1" href="#">
                    <i>Vacation Hut</i>
                  </a>
              </li>
                {/* <li className="nav-item item2">
                  <a className="nav-link font" href="#">
                    Home
                  </a>
                </li> */}
               
            
              {/* <form className="d-flex item3">
                <input
                  className="form-control me-2 btn searchbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn font searchbar" type="submit">
                <FontAwesomeIcon icon="fas fa-search" />
                </button>
              </form> */}
              <li className="nav-item item4">
                  <a className="nav-link font2" href="#">
                    Home<br></br>
                    Activities<br></br>
                    Bookings<br></br>
                    <FontAwesomeIcon icon={faInstagram} style={{ color: '#C13584' }} className="instagram" />
                    <FontAwesomeIcon icon={faFacebookF} style={{color:'#3b5998'}} className="facebook" />
                    <FontAwesomeIcon icon={faWhatsapp} style={{color: "#25D366"}} className="whatsapp" />
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "#D44638"}} className="gmail" />
                  </a>
                </li>
                </ul>
            </div>
          </div>
        </nav>
        <p className="copyright">Copyright <span><FontAwesomeIcon icon={faCopyright}/></span> 2023 Vacation Hut, All rights reserved.</p>

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