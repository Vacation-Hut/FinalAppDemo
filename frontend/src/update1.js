import React, { useState } from 'react';
import './App.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Update1() {
  const Navigate = useNavigate;
  const [images, setImages] = useState("");
  const [activityname, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [food, setFood] = useState("");
  const [accomadation, setAccomadation] = useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      formData.append("file", images);
      formData.append("upload_preset", "your_cloudinary_upload_preset_name");
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/your_cloudinary_cloud_name/image/upload",
        formData
      );
      const imageUrl = res.data.secure_url;

      // Add activity to database with image URL
      await axios.post("http://localhost:5000/dash/activity", {
        activityname,
        accomadation,
        description,
        food,
        imageUrl,
      });
      Navigate("/dash/activity");
    } catch (error) {
      console.log(error);
    }
  }

  function handleImageChange(e) {
    setImages(e.target.files[0]);
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
                <a className="nav-link" href="#">
                  <i>Vacation Hut</i>
                </a>
              </li>
              <li className="nav-item item1">
                <a className="nav-link" href="/dash">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dash/activity">
                  Activity
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/dash/users">
                  User
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Payment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
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
            <h3 class="headfont">
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
                <label className="label3">Food</label>
                <br></br>
                <input
                  name="food"
                  onChange={(e) => {
                    setFood(e.target.value);
                  }}
                ></input>
                <br></br>
                <label className="label4">Accomadation</label>
                <br></br>
                <input
                  name="accomadation"
                  onChange={(e) => {
                    setAccomadation(e.target.value);
                  }}
                ></input>
                <br></br>
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
              </form>
            </div>
            <div className="flex-item-right">
              <h3 class="headfont">
                <i>
                  <u>Activity Image</u>
                </i>
              </h3>
              <img
                src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1681897067/Activities/imageload_lubost.png"
                alt="Image"
                className="addimg"
              />
              <br></br>
  
              {/* <img src={image} className="addimg"></img><br></br>  */}
              <input type="file" name="file" onChange={handleImageChange} />
              <button
                className="btn2"
                onChange={(e) => {
                  setImages(e.target.value);
                }}
              >
                Select image
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Update1;
