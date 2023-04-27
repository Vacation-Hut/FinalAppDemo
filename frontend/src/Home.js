import React, { useState, useEffect } from "react";
import styles from "./App.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import Modal from "./Modal.js";

import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";


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
                  <a className="nav-link font" href="#">
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
                <button className="btn font searchbar" type="submit">
                {/* <FontAwesomeIcon icon="fas fa-search" /> */}
                Search
                </button>
              </form>
              <li className="nav-item item4">
                  <a className="nav-link font" href="#">
                    Add to book
                  </a>
                </li>
                </ul>
            </div>
          </div>
        </nav>
        <Carousel>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682485477/image_thinnai_1_gscr9g.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Thinnai Organic Farm</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682485535/image_beach_1_lh6zpq.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Beach side visiting</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682485598/image_crafttary_1_gogc44.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Crafttary shop</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486097/image_museum_1_cismdj.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Sivapoomi Museum</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486183/image_oil_making_center_1_l1gc0u.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Oil making center</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486250/image_pottery_1_i9fi3n.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Pottery making center</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486356/image_thinnai_2_x76by9.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Thinnai Organic Farm</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486449/image_beach_2_gi4wnc.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Beach side visiting</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486499/image_crafttary_2_bsmf7a.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Kopay Crafttary Shop</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486557/image_museum_2_hgg0n5.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Sivapoomi Museum</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682486621/image_oil_making_center_2_cjpolf.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682489947/image_pottery_2_y7extt.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block curosel"
          src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1682489986/image_thinnai_3_pbjvfb.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <h1 class="whychoose">Why Choose Vacation Hut</h1>
    <div class="flex-container">
  <div class="flex-item-leftside">
    <p>We can provide valuable insights and recommendations for travelers looking to explore the area beyond the typical tourist hotspots.</p>
    <p>This website can help travelers connect more deeply with the local culture, have a more unique and memorable travel experience, and support sustainable tourism practices.</p>
  </div>
  <div class="flex-item-rightside">
    <p>websites for tours often provide opportunities for cultural immersion, such as home-stays, cooking classes, or other hands-on experiences. This can lead to a deeper understanding and appreciation of the local culture.</p>
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
          class="w-100 shadow-1-strong mb-4 imagegallery"
        />
      </Link>
      <div className="small">
        <p>{activity.activityname}</p>
        <p className="pay">{activity.price}</p>
        <button>Booking now</button>
        <button>Add to book</button>
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
                    Bookings
                  </a>
                </li>
                </ul>
            </div>
          </div>
        </nav>


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