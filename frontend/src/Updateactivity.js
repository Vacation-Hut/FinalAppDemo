import React, { useState, useEffect } from "react";
import "./App.css";
// import image from "./imageload.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Updateactivity() {
  const { id } = useParams();
  const [images, setImages] = useState(null);
  // const [activity, setActivity] = useState({});
  const [activityname, setActivityName] = useState();
  const [description, setDescription] = useState();
  const [price, setPrice] = useState();
  
  const [data, setData] = useState([]);
  const Navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/dash/activity/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        setActivityName(data.data.activityname);
        setDescription(data.data.description);
        setPrice(data.data.price);
        
      });
  }, []);
  async function submit(e) {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("activityname", activityname);
      formData.append("description", description);
      formData.append("price", price);
      if (images) {
        const { public_id, url } = await uploadImage(images);
        formData.append("public_id", public_id);
        formData.append("url", url);
      }
    
    
      await axios.put(`http://localhost:5000/dash/activity/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Navigate("/dash/activity");
    } catch (error) {
      console.log(error);
    }
  }
  
  function handleImageChange(e) {
    const file = e.target.files[0];
    setImages(file);
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
        <h1>Update activity</h1>
        <div className="flex-container">
          <div className="flex-item-left">
            <h3>Activity details</h3>

            <form className="form">
              {/* {data.map(i =>{
              
              return ( */}

              <label>Activity Name</label>
              <br></br>
              <input
                value={activityname}
                onChange={(e) => {
                  setActivityName(e.target.value);
                }}
              ></input>
              <br></br>
              <label className="label2">Description</label>
              <br />
              <input
                name="description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
              <br />
              <label className="label3">Price</label>
              <br></br>

              <input
                name="price"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              >
              </input>
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
              onChange={(e) => {
                setImages(e.target.files[0]);
              }} // call the handleImageChange function on change event
            />
          </div>
        </div>
        <button className="btn2" onClick={submit}>
          <Link to="/dash/activity" className="btn">
            Update activity
          </Link>
        </button>
        <button className="btn2" onClick={submit}>
          <Link to="/dash/activity" className="btn">
            Cancel
          </Link>
        </button>
      </div>
    </div>
  );
}

export default Updateactivity;
