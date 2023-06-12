import React, { useState, useEffect } from "react";
import "../../Dash.css";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  faInstagram,
  faFacebookF,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";
import ResponsiveDashBar from "./Dashboardnav";
import Footer from "../User/Footer";
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';


function Package() {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    fetchPackages();
  }, []);

  async function fetchPackages() {
    try {
      const response = await axios.get("http://localhost:5000/allpackage");
      const data = response.data.data;
      setPackages(data);
    } catch (error) {
      console.error(error);
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(`http://localhost:5000/dash/package/${id}`);
      setPackages((prevPackages) => prevPackages.filter((pkg) => pkg._id !== id));
    } catch (error) {
      console.error(error);
    }
  }

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
        <div style={{textAlign:'center'}}>
          <h2 style={{ fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold', fontSize:'45px'}}>Packages</h2>
          <div style={{paddingTop:'20px'}}>
          <Link className="landbtn" style={{padding:'10px'}} to="/dash/package/add">Add new package</Link>
          </div>

          <div style={{paddingTop:'50px', paddingBottom:'20px'}}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead style={{background:'#F0E0DA'}}>
                  <TableRow>
                    <TableCell style={{textAlign:'center'}}>
                      <Typography variant="h5" style={{fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold'}}>Package Image</Typography>
                    </TableCell>
                    <TableCell style={{textAlign:'center'}}>
                      <Typography variant="h6" style={{fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold'}}>Package Name </Typography>
                    </TableCell>
                    <TableCell style={{textAlign:'center'}}>
                      <Typography variant="h6" style={{fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold'}}>Package Price</Typography>
                    </TableCell>
                    <TableCell style={{textAlign:'center'}}>
                      <Typography variant="h6" style={{fontFamily: 'Pacifico, cursive', color:'#4E0D0D', fontWeight: 'bold'}}>Action</Typography>
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody>
                   {packages.map((pkg) => (
                      <TableRow key={pkg._id}>
                        <TableCell><img src={pkg.images[0].url} alt={pkg.package} className="packagepageimages"/>
                        </TableCell>
                        <TableCell ><h4 style={{fontFamily: 'Pacifico, cursive', fontWeight: 'bold', textAlign:'center', fontSize:'25px'}}>{pkg.package}</h4></TableCell>
                        {/* <TableCell>{pkg.description}</TableCell> */}
                        <TableCell><h4 style={{fontFamily: 'Pacifico, cursive', fontWeight: 'bold', textAlign:'center', fontSize:'25px'}}>${pkg.totalprice}</h4></TableCell>
                        <TableCell><button
                       className="btn btn6 landbtn"
                       onClick={() => (window.location.href = `/dash/package/update/${pkg._id}`)}
                     >
                       Update
                     </button>
                     <button className="btn6 btn landbtn" onClick={() => handleDelete(pkg._id)}>
                       Delete
                     </button></TableCell>
                      </TableRow>
          ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Package;
