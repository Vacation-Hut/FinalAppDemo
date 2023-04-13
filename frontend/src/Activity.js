import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import pottery from './Appphoto2.png';
import oil from './Appphoto1.png';
import hraft from './Appphoto10.jpg';
import museum from './Appphoto11.jpg';
import beach from './Appphoto5.jpg';
import thinnai from './Appphoto6.jpg';
import ReactDOM from 'react-dom/client';

function Activity() {
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
        <button  class="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<div>
    <h1 class="activity">Activities</h1>
    <Link class="buttact btn w-500 border" to="/dash/activity/new">Add activity</Link>
    <div class="grid-container">
  <div class="grid-item"><img src={pottery} class="aligns"></img><div class="butt"> <Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={oil} class="aligns"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={hraft} class="aligns"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>  
  <div class="grid-item"><img src={museum} class="aligns margins"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={beach} class="aligns margins"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={thinnai} class="aligns margins"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>  
</div>
</div>
      </div>
    );
  }

  export default Activity;