import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Validation from "./loginvalidate";
import axios from "axios";
import { faInstagram, faFacebookF, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons'



function Login() {
  const Navigate = useNavigate();
  const [role, setRole] = useState();
  const [error, setError] = useState({});
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const closeModal = () => {
  //   setIsOpen(false);
  // }
  async function submit(e) {
    e.preventDefault();
    setError(Validation(email, password));
    try {
      if (error.email === "" && error.password === "")
        await axios.post("http://localhost:5000/login", {
          role,
          email,
          password,
        });

      if (email === "vacationapk@gmail.com" && password === "Apk@192407") {
        Navigate("/dash");
      } else {
        Navigate("/");
        // {isOpen && <Modal setIsOpen={setIsOpen} />}
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
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
                  <a className="nav-link font" href="#">
                    <i>Vacation Hut</i>
                  </a>
              </li>
                <li className="nav-item item2">
                  <a className="nav-link font" href="/">
                    Home
                  </a>
                </li>
                </ul>
            </div>
          </div>
        </nav>
    <div className="d-flex justify-content-center align-items-center vh-100 loginmodel">
      <div className="bg-white p-3 w-25">
        <h1>Log In</h1>
        <form action="" onSubmit={submit}>
          <div className="mb-3">
          <FontAwesomeIcon icon={faGoogle} />
            <label htmlFor="email" className="promo">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="form-control rounded-0"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              name="email"
            ></input>
            {error.email && <span className="text-danger"> {error.email}</span>}
          </div>
          <div className="mb-3">
          <FontAwesomeIcon icon={faLock} />
            <label htmlFor="password" className="promo">Password</label>
            <input
              type="password"
              placeholder="Password"
              className="form-control rounded-0"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              name="password"
            ></input>
            {error.password && (
              <span className="text-danger"> {error.password}</span>
            )}
          </div>
          <button type="submit" className="btn w-100 loginbtn">
            Log in
          </button>
          <p>You are agree our terms and conditions</p>
          <Link to="/Signup" className="btn border w-100 loginbtn">
            Create Account
          </Link>
        </form>
      </div>
      <div>
        <img 
        src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1682833360/vector1_dq481m.avif"
        className="loginimg">
        </img>
      </div>
    </div>
        <nav className="navbar navbar-expand-lg navbackground item5 loginnav">
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
                      <a className="nav-link font1" href="#">
                        <i>Vacation Hut</i>
                      </a>
                  </li>
                    {/* <li className="nav-item item2">
                      <a className="nav-link font" href="#">
                        Home
                      </a>
                    </li> */}
                  
                
                  {/* <form className="d-flex item3">
                    <input
                      className="form-control me-2 btn searchbar"
                      type="search"
                      placeholder="Search"
                      aria-label="Search"
                    />
                    <button className="btn font searchbar" type="submit">
                    <FontAwesomeIcon icon="fas fa-search" />
                    </button>
                  </form> */}
                  <li className="nav-item item4">
                      <a className="nav-link font2" href="#">
                        Home<br></br>
                        Activities<br></br>
                        Bookings<br></br>
                        <FontAwesomeIcon icon={faInstagram} style={{ color: '#C13584' }} className="instagram" />
                    <FontAwesomeIcon icon={faFacebookF} style={{color:'#3b5998'}} className="facebook" />
                    <FontAwesomeIcon icon={faWhatsapp} style={{color: "#25D366"}} className="whatsapp" />
                    <FontAwesomeIcon icon={faEnvelope} style={{ color: "#D44638"}} className="gmail" />
                      </a>
                    </li>
                    </ul>
                </div>
              </div>
            </nav>
            <p className="copyright copy">Copyright <span><FontAwesomeIcon icon={faCopyright}/></span> 2023 Vacation Hut, All rights reserved.</p>
    </div>
  );
}

export default Login;
