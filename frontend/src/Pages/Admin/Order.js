import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ResponsiveDashBar from "./Dashboardnav";


function Order() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/orders", {
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
            <ResponsiveDashBar/>
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
export default Order;
