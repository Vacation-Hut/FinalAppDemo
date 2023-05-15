import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import Footer from "../User/Footer";
import ResponsiveDashBar from "./Dashboardnav";



function Dashboard() {
  return (
    <div className="App">
      <ResponsiveDashBar/>
      <div class="dashdiv">
        <button class="dashbtn dashbtn2">Total booking</button>
        <button class="dashbtn dashbtn1">Total income</button>
      </div>
      <div class="graph">

      </div>
      <div class="recent">
        <h3 class="customer">Recent customers</h3>
        <table class="table1 table2 table table-bordered th-lg border-dark">
          <thead class="tablehead">
            <th>Name</th>
            <th>Booking Date</th>
            <th>Phone Number </th>
            <th>Country</th>
            <th>Email</th>
            <th>N.I.C</th>
            <th>Passport No</th>
          </thead>
          <tbody>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
            <tr></tr>
          </tbody>
        </table>
      </div>
      <Footer/>
    </div>
  );
}

export default Dashboard;
