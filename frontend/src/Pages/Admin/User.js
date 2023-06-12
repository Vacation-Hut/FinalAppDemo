import React, { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import "../../App.css";
import SlickCarousel from '../User/ReviewCarroussel';

function User() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userdata");
        setData(data.data);
      });
  }, []);

  return (
    <div>
      <div className="sidebarDash">
        <img src="https://res.cloudinary.com/dolq5ge5g/image/upload/v1685439779/logo1111111111-removebg-preview_pnxqde.png" alt="Vacation Hut Logo" style={{width:'250px', height:'150px'}}></img>
        <div style={{paddingTop:'20px', fontSize:'25px', fontFamily: 'Pacifico, cursive', fontWeight:'bold'}}>
          {/* <a href="/dash">Dashboard</a> */}
          <a href="/dash/package">Packages</a>
          <a href="/dash/orders">Booking</a>
          <a href="/dash/users">Users</a>
        </div>
      </div>

      <div className="contentDash">
        <h2 className="activity users" style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'45px', paddingTop:'20px'}}><b>Users</b></h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow style={{ fontFamily: 'Pacifico, cursive', fontWeight: 'bold', fontSize:'25px', background:'#F0E0DA' }}>
                <TableCell>Name</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>N.I.C Number</TableCell>
                <TableCell>Passport Number</TableCell>
                <TableCell>Country</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((i) => (
                <TableRow key={i.id}>
                  <TableCell>{i.name}</TableCell>
                  <TableCell>{i.fname}</TableCell>
                  <TableCell>{i.lname}</TableCell>
                  <TableCell>{i.role}</TableCell>
                  <TableCell>{i.email}</TableCell>
                  <TableCell>{i.phonenumber}</TableCell>
                  <TableCell>{i.nic}</TableCell>
                  <TableCell>{i.passportno}</TableCell>
                  <TableCell>{i.country}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div className='slickcarousel'><SlickCarousel/></div>
      </div>
      
    </div>
  );
}

export default User;
