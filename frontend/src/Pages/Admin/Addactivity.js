import React, { useState } from "react";
import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../User/Footer";
import ResponsiveDashBar from "./Dashboardnav";


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
      <ResponsiveDashBar/>
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
      <Footer/>
    </div>
  );
}

export default Addactivity;
