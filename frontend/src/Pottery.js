import React, { useState, useEffect } from "react";
import "./App.css";

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function Pottery() {
  const { id } = useParams();
  const [images, setImages] = useState({});
  const [activity, setActivity] = useState({});
  const [activityname, setActivityName] = useState();
  const [description, setDescription] = useState();
  const [food, setFood] = useState();
  const [accomadation, setAccomadation] = useState();

  const [data, setData] = useState([]);
  const Navigate = useNavigate();


  useEffect(() => {
    fetch(`http://localhost:5000/dash/activity/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);

        setImages(data.data.images)
        setActivityName(data.data.activityname);
        setDescription(data.data.description);  
        setFood(data.data.food);
        setAccomadation(data.data.accomadation);
      });
  });

  
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
                <li className="nav-item item2">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
               
            
              <form className="d-flex item3">
                <input
                  className="form-control me-2 btn"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn" type="submit">
                  Search
                </button>
              </form>
              <li className="nav-item item4">
                  <a className="nav-link" href="#">
                    Add to cart
                  </a>
                </li>
                </ul>
            </div>
          </div>
        </nav> 
      
        <div>
          <p>{activityname}</p>
          <img
           src={images.url}
          alt={activityname}
          height="200"
          width="200"
                        
          />
          <p>{description}</p>
        </div>
        <div>
        <form>
          <label>
            Only visiting the pottery center   1 hrs    US$6.00
          <input type="checkbox" name="option1" value="Option 1"/>
          </label><br/>
          <label>
            Get your own  experience  2.5 hrs   US$12.00
            <input type="checkbox" name="option2" value="Option 2"/>
          </label><br/>
          <label>
            Buy a memorable things  US$7.00
            <input type="checkbox" name="option3" value="Option 3"/>
          </label><br/>
          <label>
            Guider facility  per day  US$16.00
            <input type="checkbox" name="option4" value="Option 4"/>
          </label><br/>
          <h3>Mode of transport</h3>
          <label>
            Bicycle
            <input type="checkbox" name="option5" value="Option 5"/>
          </label><br/>    
          <label>
            Motor bike
          <input type="checkbox" name="option1" value="Option 1"/>
          </label><br/>
          <label>
            Auto
            <input type="checkbox" name="option2" value="Option 2"/>
          </label><br/>
          <label>
            Car
            <input type="checkbox" name="option3" value="Option 3"/>
          </label><br/>
          <label>
            Van
            <input type="checkbox" name="option4" value="Option 4"/>
          </label><br/>
          <label>
            Food
            <input type="checkbox" name="option5" value="Option 5"/>
          </label><br/> 
          <label>
            Accomadation
            <input type="checkbox" name="option5" value="Option 5"/>
          </label><br/>      
          
          </form>
          </div>
      
        <div>
            <button>Back to home</button>
            <button> Add to cart</button>
            <button>Booking now</button>
        </div>
      </div>
  );
}

export default Pottery;
