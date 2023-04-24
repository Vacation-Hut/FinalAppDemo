import React, { useState, useEffect } from "react";
import "./App.css";
// import image from "./imageload.png";
import { Link, useNavigate, useParams } from "react-router-dom";

function Updateactivity(i) {
  const [activity, setActivity] = useState([]);
  const [activityname,setActivityName]=useState()
  const [description,setDiscription]=useState()
  const [food,setFood]=useState()
  const [accomadation,setAccomadation]=useState()


  const [data, setData] = useState([]);
  const Navigate = useNavigate()

  
    
 ;
 
 useEffect(() => {
  fetch("http://localhost:5000/allactivity", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      setData(data.data);
      
      console.log(data.data[0].activityname)
        setActivityName(data.data[0].activityname)
        setDiscription(data.data[0].description)
        setFood(data.data[0].food)
        setAccomadation(data.data[0].accomadation)
        
    });
}, []);






async function submit(e) {
  e.preventDefault();
  const updatedProduct = {
    activityname,
    description,
    food,
    accomadation
  };

  try {
    const res = await fetch(`http://localhost:5000/dash/activity/:id`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
   
    if (res.ok) {
      Navigate("/dash/activity")
     
    }
    else{
      throw new Error("Failed to update product");
    }
    
  } catch (err) {
    console.error(err);
  }
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
            {/* <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form> */}
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

              
              <label>Activity Name</label><br></br>
          <input value={activityname} onChange={(e) => {
                  setActivityName(e.target.value);
                }}></input><br></br>
              <label className="label2">Description</label>
              <br />
              <input
                name="description"
                value={description}
                onChange={(e) => {
                  setDiscription(e.target.value);
                }}
              />
              <br />
              <label className="label3">Food</label>
              <br></br>

              <input
                name="food"
                value={food}
                onChange={(e) => {
                  setFood(e.target.value);
                }}
              >
                {i.food}
              </input>
              <br></br>
              <label className="label4">Accomadation</label>
              <br></br>
              <input
                name="accomadation"
                value={accomadation}
                onChange={(e) => {
                  setAccomadation(e.target.value);
                }}
              ></input>
              <br></br>

              <button className="btn2" onClick={submit}>
                Update activity
              </button>
              <Link to="/dash/activity" className="btn3 btn">
                Cancel
              </Link>

              {/* )})} */}
            </form>
          </div>
          <div className="flex-item-right">
            <h3>Activity Image</h3>
            <img src="https://res.cloudinary.com/dtbqcm3e2/image/upload/v1681897067/Activities/imageload_lubost.png" alt="Image" className="addimg" /><br></br>
            <br></br>
            <button className="btn1">Select image</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updateactivity;
