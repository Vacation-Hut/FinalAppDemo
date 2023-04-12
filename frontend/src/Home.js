import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './App.css';


function Home() {
  const Navigate = useNavigate();
  function login (e){
    Navigate("/login")
  }
    return (
      <div className="App">
        <h1>My home page</h1><br></br>
        <button onClick={login}>Login</button>
      </div>
 );
}


export default Home;
  