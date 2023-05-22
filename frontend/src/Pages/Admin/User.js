import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Validation from "../../Validation/loginvalidate";
import axios from "axios";
import { faInstagram, faFacebookF, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import ResponsiveDashBar from "./Dashboardnav";
import Footer from "../User/Footer";



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
      <ResponsiveDashBar/><br/>
      <h2 className="activity users"><b>Users</b></h2>
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
      <Footer/>
    </div>
  );
}
export default User;
