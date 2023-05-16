import React, { useState, useEffect } from "react";
import "../../App.css";
import { Link, Navigate } from "react-router-dom";
import ReactDOM from "react-dom/client";
import axios from "axios";
import { faInstagram, faFacebookF, faWhatsapp} from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCopyright } from '@fortawesome/free-solid-svg-icons'
import ResponsiveDashBar from "./Dashboardnav";
import Footer from "../User/Footer";



function Package() {
  const [images, setImages] = useState([]);
  const [activityname, setActivityName] = useState();
  const [description, setDiscription] = useState();
  const [price, setPrice] = useState();

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/allpackage", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
        const allImages = data.data.map((packages) => packages.images[0].url);
        setImages(allImages);
      });
  }, [])

  async function Delete(id) {
    try {
      const res = await fetch(`http://localhost:5000/dash/package/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
  }

  async function submit(e) {
    e.preventDefault();
    const updatedProduct = {
      images,
      activityname,
      description,
      price
    };

    try {
      const res = await fetch(`http://localhost:5000/dash/package/:id`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) {
        throw new Error("Failed to update product");
      }
      Navigate("/dash/packages");
    } catch (err) {
      console.error(err);
    }
  }

  // async function Update(id) {
  //   try{
  //   Navigate(`dash/activity/${id}/update`)
  // } catch (err) {
  //   console.error(err);
  // }
  // }

  return (
    <div className="App">
      <ResponsiveDashBar/>
      <div>
        <h1 className="activity">Packages</h1>
        <Link className="btn border btn4" to="/dash/package/add">
          Add Package
        </Link>
        <div className="grid-container">
          <table class="table1 table4 table table-bordered th-lg border-dark">
            <thead class="tablehead1">
              <tr>
                <th>Image</th>
                <th>Package Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Update/Delete</th>
              </tr>
            </thead>
            <tbody>
            {images.map((image, index) => {
        const activity = data[index];
        return (
                  <tr key={index}>
                    <td>
                 
            <img
              src={image}
              alt={activity.package}
              class="shadow-1-strong mb-4 imagegallery"
            />
              
       
                    </td>
                    <td>{activity.package}</td>
                    <td>{activity.description}</td>
                    <td>{activity.totalprice}</td>
                    <td>
                      <button
                        class="btn btn6"
                        onClick={() =>
                          (window.location.href = `/dash/package/update/${activity._id}`)
                        }
                      >
                        Update
                      </button>
                      <button class="btn6 btn" onClick={() => Delete(activity._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default Package;
