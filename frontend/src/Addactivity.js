import React, { useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { faInstagram, faFacebookF, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons'


function Addactivity() {
  const Navigate = useNavigate;
  const [images, setImages] = useState(null); 
  const [activityname, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");


  async function submit(e) {
    e.preventDefault();
    try {
      const formData = new FormData(); 
      formData.append("activityname", activityname);
      formData.append("description", description);
      formData.append("price", price);

      const { public_id, url } = await uploadImage(images); 

      formData.append("public_id", public_id); 
      formData.append("url", url); 
      await axios.post("http://localhost:5000/dash/activity", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
      });
      Navigate("/dash/activity");
    } catch (error) {
      console.log(error);
    }
  }

  async function uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "http://localhost:5000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  function handleImageChange(e) {
    const file = e.target.files[0]; 
    setImages(file); 
  }

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
              <li className="nav-item item1">
                <a className="nav-link font" href="/dash">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="/dash/activity">
                  Activity
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="/dash/users">
                  User
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">
                  Payment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">
                  Booking
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div>
        <h1 className="activity">Add new activity</h1>
        <div className="flex-container">
          <div className="flex-item-left">
            <h3 className="headfont">
              <i>
                <u>Activity details</u>
              </i>
            </h3>
            <form className="form">
              <label className="label1">Activity name</label>
              <br></br>
              <input
                name="activityname"
                onChange={(e) => {
                  setActivityName(e.target.value);
                }}
              ></input>
              <br></br>
              <label className="label2">Description</label>
              <br></br>
              <input
                name="description"
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></input>
              <br></br>
              <label className="label3">Price</label>
              <br></br>
              <input
                name="price"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              ></input>
              <br></br>
              
            </form>
          </div>
          <div className="flex-item-right">
            <h3 className="headfont">
              <i>
                <u>Activity Image</u>
              </i>
            </h3>
            {images ? (
              <img
                src={URL.createObjectURL(images)}
                alt="Selected Image"
                className="addimg"
              />
            ) : (
              <img
                src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1681897067/Activities/imageload_lubost.png"
                alt="Default Image"
                className="addimg"
              />
            )}
            <br />

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange} // call the handleImageChange function on change event
            />
          </div>
        </div>
        <button className="btn2" onClick={submit}>
          <Link to="/dash/activity" className="btn">
            Add activity
          </Link>
        </button>
        <button className="btn2" onClick={submit}>
          <Link to="/dash/activity" className="btn">
            Cancel
          </Link>
        </button>
      </div>
      <nav className="navbar navbar-expand-lg navbackground addactivitynav">
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
  );
}

export default Addactivity;
