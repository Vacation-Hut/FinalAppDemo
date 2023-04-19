import React, { useState, useEffect } from "react";
import "./App.css";
import { Link, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import axios from "axios";

function Activity() {
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

  async function Delete(id) {
    try {
      const res = await fetch(`http://localhost:5000/dash/activity/${id}`, {
        method: "DELETE",
      });
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
        <h1 className="activity">Activities</h1>
        <Link className="btn border btn4" to="/dash/activity/new">
          Add activity
        </Link>
        <div className="grid-container">
          <table class="table1 table4 table table-bordered th-lg border-dark">
            <thead class="tablehead">
              <tr>
                {/* <th>Image</th> */}
                <th>Activity Name</th>
                <th>Description</th>
                <th>Food</th>
                <th>Accomadation</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody>
              {data.map((i) => {
                return (
                  <tr key={i.id}>
                    <td>
                      
                        {i.activityname}
                      
                    </td>
                    <td>{i.description}</td>
                    <td>{i.food}</td>
                    <td>{i.accomadation}</td>
                    <button class="btn btn5" onClick={() => {window.location.href=`/dash/activity/${i._id}/update`}}>Update</button>
                    <button class="btn6 btn" onClick={() => Delete(i._id)}>Delete</button>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Activity;
