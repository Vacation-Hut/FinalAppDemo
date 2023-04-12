import React from 'react';
import './App.css';
import image from './imageload.png';

function Addactivity() {
    return (
      <div className="App">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#">Dashboard</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Activity</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">User</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Payment</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#">Booking</a>
        </li>
      </ul>
      <form class="d-flex">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button class="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<div>
    <h1>Add new activity</h1>
    <div class="flex-container">
  <div class="flex-item-left"><h3>Activity details</h3>
      <form class="form">
        <label class="label1">Activity name</label><br></br>
        <input name="activityname"></input><br></br>
        <label class="label2">Discription</label><br></br>
        <input name="discription"></input><br></br>
        <label class="label3">Food</label><br></br>
        <input name="Food"></input><br></br>
        <label class="label4">Accommodation</label><br></br>
        <input name="accommodation"></input><br></br>
        <button class="btn2">Add activity</button><button class="btn3">Cancel</button>
      </form>
  </div>
  <div class="flex-item-right">
    <h3>Activity Image</h3>
    <img src={image} class="addimg"></img><br></br>
    <button class="btn1">Select image</button>

  </div>
    </div>
</div>
</div>
    );
  }

  export default Addactivity;