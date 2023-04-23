import React from "react";
import "./App.css";

function Dashboard() {
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
         <h1 class="headingpayment">Payment Details</h1>
         <table className="table table-bordered table5">
         <tr class="paymenttr">
            <td><h3>Details</h3></td>
            <td><h3>Amount</h3></td>
         </tr>
         <tr>
             <td></td>
             <td></td>
         </tr>
         </table>
         <div class="flex-container">
             <div class="flex-item-left">
                <label>First Name</label><br></br>
                <input type="string" class="input1"></input><br></br><br></br>
                <label>Last Name</label><br></br>
                <input type="string" class="input1"></input><br></br><br></br>
                <label>Email Address</label><br></br>
                <input type="email" class="input1"></input><br></br><br></br>
                <label>Phone Number</label><br></br>
                <input type="number" class="input1"></input><br></br><br></br>
                <label>Country</label><br></br>
                <input type="string" class="input1"></input><br></br><br></br>
                <label>NIC Number</label><br></br>
                <input type="number" class="input1"></input><br></br><br></br>
                <label>Passport Number</label><br></br>
                <input type="string" class="input1"></input><br></br><br></br>

             </div>
             <div class="flex-item-right">
             <label>Cardholder Name</label><br></br>
                <input type="string" class="input1"></input><br></br><br></br>
                <label>Card Number</label><br></br>
                <input type="number" class="input1"></input><br></br><br></br>
                <label>Expiry Date</label><br></br>
                <input type="date" class="input1"></input><br></br><br></br>
                <label>CVV</label><br></br>
                <input type="string" class="input1"></input><br></br><br></br>
             </div>
         </div>
         <button class="btn7">Submit</button>
        </div>
  );
}

export default Dashboard;
