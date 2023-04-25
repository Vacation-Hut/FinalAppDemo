import React, { useState } from "react";
import "./App.css";
import { Link, useNavigate ,useParams} from "react-router-dom";
import axios from "axios";

function Upadte1() {
  const { id } = useParams(); 
  const Navigate = useNavigate;
  const [images, setImages] = useState(null); // set initial value to null
  const [activityname, setActivityName] = useState("");
  const [description, setDescription] = useState("");
  const [food, setFood] = useState("");
  const [accomadation, setAccomadation] = useState("");

  async function submit(e) {
    e.preventDefault();
    
    try {
     
        // get the activity id from somewhere, such as the URL or a hidden field
      const formData = new FormData(); // create a new FormData object
      formData.append("activityname", activityname);
      formData.append("accomadation", accomadation);
      formData.append("description", description);
      formData.append("food", food);
    
      
        const { public_id, url } = await uploadImage(images);
         // upload the image and get the public ID and secure URL
        formData.append("public_id", public_id); // append the public ID to the form data
        formData.append("url", url); // append the secure URL to the form data
      
      
  
      await axios.put(`http://localhost:5000/dash/activity/${id}`, formData, {
        headers: {
          "Content-Type": "form-data", // set the content type header
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
    const response = await axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  function handleImageChange(e) {
    const file = e.target.files[0]; // get the first selected file
    setImages(file); // set the selected file as the value of images state
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
                {/* <br></br>
               <button className="btn2" onClick={submit}>
                 <Link to="/dash/activity" className="btn">
                   Add activity
                 </Link>
              </button>
               <button className="btn2" onClick={submit}>
                <Link to="/dash/activity" className="btn">
                  Cancel
                 </Link>
               </button>  */}
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
    </div>
  );
}

export default Upadte1;

