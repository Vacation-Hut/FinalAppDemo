import React, { useState, useEffect } from "react";
import "./App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Validation from "./loginvalidate";
import axios from "axios";

function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userdata");
        setData(data.data);
      });
  }, []);
  return (
    <div>
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
      <h1 className="activity users">Users</h1>
      <table>
        <thead>
          <tr>
            {/* <th>Image</th> */}
            <th>Name</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>N.I.C Number</th>
            <th>Passport Number</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {data.map((i) => {
            return (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.fname}</td>
                <td>{i.lname}</td>
                <td>{i.role}</td>
                <td>{i.email}</td>
                <td>{i.phonenumber}</td>
                <td>{i.nic}</td>
                <td>{i.passportno}</td>
                <td>{i.country}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
export default User;
