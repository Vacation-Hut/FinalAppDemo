import React, { useState, useEffect } from "react";
import "./App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Validation from "./loginvalidate";
import axios from "axios";
import { faInstagram, faFacebookF, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons'


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
                <a className="nav-link font" href="#">
                  <i>Vacation Hut</i>
                </a>
            </li>
              <li className="nav-item item1">
                <a className="nav-link font" href="/dash">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="/dash/activity">
                  Activity
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">
                  User
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">
                  Payment
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link font" href="#">
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
      <h1 className="activity users">Users</h1>
      <table class="table1 table3 table table-bordered th-lg border-dark">
        <thead class="tablehead1">
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
      <nav className="navbar navbar-expand-lg navbackground usernav">
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
                  <a className="nav-link font1" href="#">
                    <i>Vacation Hut</i>
                  </a>
              </li>
                {/* <li className="nav-item item2">
                  <a className="nav-link font" href="#">
                    Home
                  </a>
                </li> */}
               
            
              {/* <form className="d-flex item3">
                <input
                  className="form-control me-2 btn searchbar"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn font searchbar" type="submit">
                <FontAwesomeIcon icon="fas fa-search" />
                </button>
              </form> */}
              <li className="nav-item item4">
                  <a className="nav-link font2" href="#">
                    Home<br></br>
                    Activities<br></br>
                    Bookings<br></br>
                    <FontAwesomeIcon icon={faInstagram} style={{ color: '#C13584' }} className="instagram" />
                    <FontAwesomeIcon icon={faFacebookF} style={{color:'#3b5998'}} className="facebook" />
                    <FontAwesomeIcon icon={faWhatsapp} style={{color: "#25D366"}} className="whatsapp" />
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "#D44638"}} className="gmail" />
                  </a>
                </li>
                </ul>
            </div>
          </div>
        </nav>
        <p className="copyright copy">Copyright <span><FontAwesomeIcon icon={faCopyright}/></span> 2023 Vacation Hut, All rights reserved.</p>
    </div>
  );
}
export default User;
