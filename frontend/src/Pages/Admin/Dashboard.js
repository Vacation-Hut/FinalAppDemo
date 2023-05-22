import React from "react";
import "../../App.css";
import { Link } from "react-router-dom";
import Footer from "../User/Footer";
import ResponsiveDashBar from "./Dashboardnav";



function Dashboard() {
  return (
    <div className="App">
      <ResponsiveDashBar/>
      {/* <div class="dashdiv">
        <button class="dashbtn dashbtn2">Total booking</button>
        <button class="dashbtn dashbtn1">Total income</button>
      </div> */}
      <div class="graph">

      </div>
      {/* <div class="recent">
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
      </div> */}

<div id="mySidenav" class="sidenav">
<p class="logo">VacationHut<span class="menu">&#9776;</span></p>
<p class="logo1"><span class="menu1">&#9776;</span></p> 
<a href="#" class="icon-a"><i class="fa fa-dashboard icons"></i>&nbsp;&nbsp;&nbsp;DASHBOARD</a><br/>
<a href="#" class="icon-a"><i class="fa fa-pie-chart icons"></i>&nbsp;&nbsp;&nbsp;PACKAGE</a><br/>
<a href="#" class="icon-a"><i class="fa fa-list icons"></i>&nbsp;&nbsp;&nbsp;PAYMENT</a><br/>
<a href="#" class="icon-a"><i class="fa fa-user icons"></i>&nbsp;&nbsp;&nbsp;BOOKING</a><br/>
<a href="#" class="icon-a"><i class="fa fa-shopping-bag icons"></i>&nbsp;&nbsp;&nbsp;USER</a><br/>
{/* <a href="#" class="icon-a"><i class="fa fa-shopping-bag icons"></i>&nbsp;&nbsp;oder</a><br/> */}

</div>

<div id="main">
  <div class="head">
<div class="col-div-6">
  <p class="nav">Dashboard</p>
</div>

<div class="col-div-6">
  <i class="fa fa-search serarc-icon"></i>

<i class="fa fa-bell noti-con"></i>
<div class="notification-div">
  <p class="noti-head">Notification<span>2</span></p>
<hr/>

</div>

<div class="profile">
       {/* <img src="images/user.png" class="pro-img"/>
       <p>kajalini<i class="fa fa-ellipsis-v dots"></i></p> */}
<div class="profile-div">
        {/* <p><i class="fa fa-user"></i>&nbsp;&nbsp;Profile</p>
        <p><i class="fa fa-cogs"></i>&nbsp;&nbsp;settings</p>
        <p><i class="fa fa-power-off"></i>&nbsp;&nbsp;logo</p>
         */}
</div>
</div>
</div>
  <div class="clearfix">
</div>

<br/>

  <div class="col-div-4-1">
     <div class="box">
<p class="head-1">PACKAGE</p>
<p class="number">6</p>
<p class="percent"><i class="fa fa-long-arrow-up"></i>5.67%<span>Since last months</span></p>
<i class="fa fa-line-chart box-icon"></i>
     </div>
  </div>

  <div class="col-div-4-1">
     <div class="box">
<p class="head-1">USER</p>
<p class="number">263</p>
<p class="percent"><i class="fa fa-long-arrow-up"></i>5.67%<span>Since last months</span></p>
<i class="fa fa-line-chart box-icon"></i>
     </div>
  </div>

  <div class="col-div-4-1">
     <div class="box">
<p class="head-1">BOOKING</p>
<p class="number">250</p>
<p class="percent"><i class="fa fa-long-arrow-up"></i>5.67%<span>Since last months</span></p>
<i class="fa fa-line-chart box-icon"></i>
     </div>
  </div>
</div>

<div class="clearfix"><br/>

</div>
</div>

 <Footer/>
    </div>
  );
}

export default Dashboard;
