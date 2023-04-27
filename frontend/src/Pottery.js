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
          <h1 className="acthead">{activityname}</h1>
          <img
           src={images.url}
          alt={activityname}
          className="actimg"
          height="500"
          width="800"
                        
          />
          <p className="des">{description}</p>
        </div>
        <div className="subtext">
        <form>
          <label>
            Only visiting the pottery center <span className="time1">  1 hrs </span> <span className="payment1">   US$6.00 </span>
          <input type="checkbox" name="option1" value="Option 1" className="box1"/>
          </label><br/><br/>
          <label>
            Get your own  experience <span className="time2"> 2.5 hrs </span> <span className="payment2"> US$12.00 </span>
            <input type="checkbox" name="option2" value="Option 2" className="box2"/>
          </label><br/><br/>
          <label>
            Buy a memorable things <span className="payment3"> US$7.00 </span>
            <input type="checkbox" name="option3" value="Option 3" className="box3"/>
          </label><br/><br/>
          <label>
            Guider facility   <span className="time3">per day </span> <span className="payment4"> US$16.00 </span>
            <input type="checkbox" name="option4" value="Option 4" className="box5"/>
          </label><br/><br/>
          <label>
            Food <span className="time4"> per meal</span> <span className="payment5">US$10.00</span>
            <input type="checkbox" name="option5" value="Option 5" className="box6"/>
          </label><br/> <br/>
          <label>
            Accomadation <span className="time5">per day</span> <span className="payment6">US$40.00</span>
            <input type="checkbox" name="option5" value="Option 5" className="box7"/>
          </label><br/>  <br/>   
          <h3>Mode of transport</h3>
          <label>
            Bicycle <span className="time6">per person</span> <span className="payment7">US$10.00</span>
            <input type="checkbox" name="option5" value="Option 5" className="box8"/>
          </label><br/> <br/>   
          <label>
            Motor bike <span className="time7">per person</span> <span className="payment8">US$16.00</span>
          <input type="checkbox" name="option1" value="Option 1" className="box9"/>
          </label><br/><br/>
          <label>
            Auto <span className="time8">3 person</span> <span className="payment9">US$20.00</span>
            <input type="checkbox" name="option2" value="Option 2" className="box10"/>
          </label><br/><br/>
          <label>
            Car <span className="time9">4 person</span> <span className="payment10">US$25.00</span>
            <input type="checkbox" name="option3" value="Option 3" className="box11"/>
          </label><br/><br/>
          <label>
            Van <span className="time10">10 person</span> <span className="payment11">US$28.00</span>
            <input type="checkbox" name="option4" value="Option 4" className="box12"/>
          </label><br/><br/>
           
          
          </form>
          </div>
      
        <div className="actbtn">
        <Link to="/"> <button className="actbtn1">Back to home</button></Link>
            <button className="actbtn2"> Add to book</button>
            <button className="actbtn3">Booking now</button>
        </div>
      </div>
  );
}

export default Pottery;
