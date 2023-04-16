import React from 'react';
import './App.css';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link" href="#">Dashboard</a>
        </li>
        <li className="nav-item">
          <Link to="/dash/activity" className="nav-link">Activity</Link>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/dash/users">User</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Payment</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Booking</a>
        </li>
      </ul>
      <form className="d-flex">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
</div>
    );
  }

  export default Dashboard;