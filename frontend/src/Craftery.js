import React from "react";
import "./App.css";

function Craftery() {
    return (
      <div className="App">
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
                  <a className="nav-link" href="#">
                    <i>Vacation Hut</i>
                  </a>
              </li>
                <li className="nav-item item2">
                  <a className="nav-link" href="#">
                    Home
                  </a>
                </li>
               
            
              <form className="d-flex item3">
                <input
                  className="form-control me-2 btn"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                />
                <button className="btn" type="submit">
                  Search
                </button>
              </form>
              <li className="nav-item item4">
                  <a className="nav-link" href="#">
                    Add to cart
                  </a>
                </li>
                </ul>
            </div>
          </div>
        </nav> 
        <div>
            <button>Back to home</button>
            <button> Add to cart</button>
            <button>Booking now</button>
        </div>
        </div>
  );
}

export default Craftery;
