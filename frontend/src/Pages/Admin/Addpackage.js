import React, { useState } from "react";
// import "../../App.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ResponsiveDashBar from "./Dashboardnav";
import Footer from "../User/Footer";
function Addpackage() {
  async function postPackage(event) {
    event.preventDefault();
   const Navigate = useNavigate
    const form = document.querySelector("form");
    const formData = new FormData(form);
    const packageData = {};
    const userId = localStorage.getItem("userId");
    // Extract the package name from the form data
    packageData.package = formData.get("package");
    packageData.description = formData.get("description");
    packageData.totalprice = formData.get("total")
    packageData.id = userId; // Replace `userId` with the actual user ID value
    // Extract the details data from the form data
    packageData.details = [];
    const activities = formData.getAll("activity[]");
    const costs = formData.getAll("cost[]");
    for (let i = 0; i < activities.length; i++) {
      const activity = activities[i];
      const cost = parseInt(costs[i]);
      if (activity && cost) {
        packageData.details.push({
          activity,
          cost,
        });
      }
    }
    const images = document.querySelector("#images").files;
    const imageUrls = [];
    const publicIds = [];
    for (const image of images) {
      const { public_id, url } = await uploadImage(image);
      publicIds.push(public_id);
      imageUrls.push(url);
    }
    async function uploadImage(file) {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    }
    packageData.images = imageUrls.map((url, i) => ({
      url,
      public_id: publicIds[i],
    }));
    const token = localStorage.getItem("token"); // Get the token from local storage
try {
  const response = await fetch("http://localhost:5000/packages", {
    method: "POST",
    body: JSON.stringify(packageData),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}` // Include the token in the headers
    },
  });
  alert(" saved package!");
  window.location.href = "/dash/package";
} catch (err) {
  console.error(err);
  alert("Error saving package!");
}
  }
  function handleImageChange(event) {
    const input = event.target;
    if (input.files && input.files.length) {
      const previewContainer = document.querySelector("#image-preview");
      previewContainer.innerHTML = ""; // Clear existing previews
      for (const file of input.files) {
        const reader = new FileReader();
        reader.onload = function () {
          const preview = document.createElement("img");
          preview.src = reader.result;
          previewContainer.appendChild(preview);
        };
        reader.readAsDataURL(file);
      }
    }
  }
  return (
    <div className="App">
      <ResponsiveDashBar/>
      <div>
        
        <h1 className="activity">Add new activity</h1>
        <form>
          <label>Package:</label>
          <input type="text" name="package" />
          <br />
          <label>Description:</label>
          <input type="text" name="description" />
          <br />
          <label>Total Price:</label>
          <input type="Number" name="total" />
          <br />
          <fieldset>
            <legend>Details:</legend>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]" />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]"  />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]" />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]"  />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]" />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]"  />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]" />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]"  />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]" />
            </div>
            <div class="activity">
              <label>Activity:</label>
              <input type="text" name="activity[]" />
            </div>
            <div class="cost">
              <label>Cost:</label>
              <input type="number" name="cost[]"  />
            </div>
          </fieldset>
          <label for="images">Select Images:</label>
          <input
            type="file"
            id="images"
            name="images"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
          <div id="image-preview"></div>
          <button type="submit" onClick={postPackage}>
            Save
          </button>
        </form>
      </div>
     
      <Footer/>
    </div>
  );
}
export default Addpackage;