import React, { useState, useEffect } from "react";
import "./App.css";
import { Link, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import axios from "axios";

function Activity1() {
  const [activity, setActivity] = useState([]);
  const [activityname,setActivityName]=useState()
  const [description,setDiscription]=useState()
  const [food,setFood]=useState()
  const [accomadation,setAccomadation]=useState()


  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allactivity", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  }, []);
 
  async function Selectuser(id) {
   setActivityName(data[0].activityname)
   setDiscription(data[0].description)
   setFood(data[0].food)
   setAccomadation(data[0].accomadation)}
  async function Delete(id) {
    try {
      const res = await fetch(`http://localhost:5000/dash/activity/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  }

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

      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      Navigate("/dash/activity");
    } catch (err) {
      console.error(err);
    }
  }


  // async function Update(id) {
  //   try{
  //   Navigate(`dash/activity/${id}/update`)
  // } catch (err) {
  //   console.error(err);
  // }
  // }

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
                <a className="nav-link" href="#">
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
        <div className="d-flex flex-column bd-highlight mb-3">
        <h1 className="activity">Activities</h1>
        <Link className="btn border btn4" to="/dash/activity/new">
          Add activity
        </Link>
        <div className="grid-container">
          <table class="table1 table4 table table-bordered th-lg border-dark">
            <thead class="tablehead">
              <tr>
                <th>Image</th>
                <th>Activity Name</th>
                <th>Description</th>
                <th>Food</th>
                <th>Accomadation</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item,i) => 
                
                  <tr key={i}>
                    <td>
                      <img
                        src={item.images.url}
                        alt={item.activityname}
                        height="200"
                        width="200"
                      />
                    </td>
                    <td>{item.activityname}</td>
                    <td>{item.description}</td>
                    <td>{item.food}</td>
                    <td>{item.accomadation}</td>
                    
                    <button class="btn6 btn" onClick={() => Delete(i._id)}>
                      Delete
                    </button>
                    <button onClick={()=>Selectuser(item._id)}>Update</button>
                  </tr>
                )}
            </tbody>
          </table>
          </div>
          <div className="d-flex flex-column bd-highlight mb-3 w-50 mx-5 px-5" >
            <label>Activity Name</label>
          <input value={activityname} onChange={(e) => {
                  setActivityName(e.target.value);
                }}></input><br></br>
                <label>Description</label>
          <input value={description} onChange={(e) => {
                  setDiscription(e.target.value);
                }}></input><br></br>
                <label>Food</label>
          <input value={food} onChange={(e) => {
                  setFood(e.target.value);
                }}></input><br></br>
                <label>Accomadation</label>
                  <input value={accomadation} onChange={(e) => {
                  setAccomadation(e.target.value);
                }}></input>
                  <button className="btn2 w-20" onClick={submit}>
                Update activity
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Activity1;
