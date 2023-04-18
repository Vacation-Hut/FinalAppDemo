import React, { useState, useEffect } from "react";
import "./App.css";
import image from "./imageload.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function Updateactivity(i) {
  const Navigate = useNavigate();
  const [data, setData] = useState({});
  const { id } = useParams();
  const [activityname, setActivityName] = useState(data.activityname);
  const [description, setDescription] = useState(data.description);
  const [food, setFood] = useState(data.food);
  const [accommodation, setAccommodation] = useState(data.accommodation);

  useEffect(() => {
    fetch(`http://localhost:5000/dash/activity/${id}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);

  async function submit(e) {
    e.preventDefault();
    const updatedProduct = {
      activityname,
      description,
      food,
      accommodation,
    };

    try {
      const res = await fetch(`http://localhost:5000/dash/activity/:id`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }

      Navigate("/dash/activity");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Activity
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
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
            <form className="d-flex">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-outline-primary" type="submit">
                Search
              </button>
            </form>
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

              <label className="label1">Activity name</label>
              <br />
              <input
                name="activityname"
                value={activityname}
                onChange={(e) => {
                  setActivityName(e.target.value);
                }}
              ></input>
              <br />
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
              <label className="label4">Accommodation</label>
              <br></br>
              <input
                name="accommodation"
                value={accommodation}
                onChange={(e) => {
                  setAccommodation(e.target.value);
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
            <img src={image} className="addimg"></img>
            <br></br>
            <button className="btn1">Select image</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Updateactivity;
