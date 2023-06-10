import React from "react";
import "../../Dash.css";
import { Link } from "react-router-dom";
import Footer from "../User/Footer";
import ResponsiveDashBar from "./Dashboardnav";



function Dashboard() {
  return (
//     <div className="App">
//       {/* <ResponsiveDashBar/> */}
//       {/* <div class="dashdiv">
//         <button class="dashbtn dashbtn2">Total booking</button>
//         <button class="dashbtn dashbtn1">Total income</button>
//       </div> */}
//       <div class="graph">

//       </div>
//       {/* <div class="recent">
//         <h3 class="customer">Recent customers</h3>
//         <table class="table1 table2 table table-bordered th-lg border-dark">
//           <thead class="tablehead">
//             <th>Name</th>
//             <th>Booking Date</th>
//             <th>Phone Number </th>
//             <th>Country</th>
//             <th>Email</th>
//             <th>N.I.C</th>
//             <th>Passport No</th>
//           </thead>
//           <tbody>
//             <tr></tr>
//             <tr></tr>
//             <tr></tr>
//             <tr></tr>
//             <tr></tr>
//             <tr></tr>
//             <tr></tr>
//           </tbody>
//         </table>
//       </div> */}

// <div id="mySidenav" class="sidenav">
// <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" style={{width:'230px'}}></img>
// <p class="logo1"><span class="menu1">&#9776;</span></p> 
// <a href="/dash" class="icon-a" style={{paddingTop:'60px', fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold'}}><i class="fa fa-dashboard icons"></i>&nbsp;&nbsp;&nbsp;DASHBOARD</a><br/>
// <a href="/dash/package" class="icon-a" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}><i class="fa fa-pie-chart icons"></i>&nbsp;&nbsp;&nbsp;PACKAGE</a><br/>
// {/* <a href="#" class="icon-a"><i class="fa fa-list icons"></i>&nbsp;&nbsp;&nbsp;PAYMENT</a><br/> */}
// <a href="/dash/orders" class="icon-a" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}><i class="fa fa-user icons"></i>&nbsp;&nbsp;&nbsp;BOOKING</a><br/>
// <a href="/dash/users" class="icon-a" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold' }}><i class="fa fa-shopping-bag icons"></i>&nbsp;&nbsp;&nbsp;USER</a><br/>
// {/* <a href="#" class="icon-a"><i class="fa fa-shopping-bag icons"></i>&nbsp;&nbsp;oder</a><br/> */}

// </div>

// <div id="main">
//   <div class="head">
// <div class="col-div-6">
//   <p class="nav" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', paddingTop:'40px' }}>Dashboard</p>
// </div>
// </div>
// </div>

//     </div>



<div>
  <div className="sidebarDash">
    <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" alt="Vacation Hut Logo" style={{width:'250px', height:'150px'}}></img>
    <div style={{paddingTop:'20px', fontSize:'25px', fontFamily: 'Pacifico, cursive', fontWeight:'bold'}}>
    <a href="/dash">Dashboard</a>
    <a href="/dash/package">Packages</a>
    <a href="/dash/orders">Booking</a>
    <a href="/dash/users">Users</a>
    </div>
  </div>

  <div className="contentDash">
    <h2 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'45px'}}>Dashboard</h2>
  </div>
</div>
  );
}

export default Dashboard;
