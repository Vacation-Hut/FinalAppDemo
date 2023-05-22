import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

function UpdatePackage() {
  const { id } = useParams();
  const [previewImages, setPreviewImages] = useState([]);
  const [packageData, setPackageData] = useState({
    package: "",
    description: "",
    details: [],
    images: [],
  });

  useEffect(() => {
    async function fetchPackageData() {
      try {
        const response = await axios.get(`http://localhost:5000/package/${id}`);
        setPackageData(response.data);
      } catch (error) {
        console.error(error);
        // Handle error here, e.g. show error message to user
      }
    }

    fetchPackageData();
  }, [id]);

  async function handleSubmit(event) {
    event.preventDefault();
  
    const formData = new FormData(event.target);
    const details = [];
  
    for (let i = 0; i < 10; i++) {
      const activity = formData.get(`activity-${i}`);
      const cost = formData.get(`cost-${i}`);
      if (activity !== null && cost !== null) {
        details.push({ activity, cost });
      }
    }
  
    const images = document.querySelector("#images").files;
    const imageUrls = [];
    const publicIds = [];
  
    for (const file of images) {
      const { url, public_id } = await uploadImage(file);
      imageUrls.push(url);
      publicIds.push(public_id);
    }
  
    const updatedPackageData = {
      package: formData.get("package"),
      description: formData.get("description"),
      totalprice: formData.get("totalprice"),
      note : formData.get("note"),
      details,
      images: packageData.images.concat(
        imageUrls.map((url, i) => ({
          url,
          public_id: publicIds[i],
        }))
      ),
    };
  
    try {
      const response = await axios.put(`http://localhost:5000/package/${id}`, updatedPackageData);
  
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
   alert("Package Update success")
      // Handle success here, e.g. show success message to user
    } catch (error) {
      console.error(error);
      // Handle error here, e.g. show error message to user
    }
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

 

  // packageData.images = imageUrls.map((url, i) => ({
  //   url,
  //   public_id: publicIds[i],
  // }));

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

//   return (
//     <div>
//       <ResponsiveDashBar/>
//     <div className="container">
//       <div className="row justify-content-center">
//         <div className="col-lg-8">
//           <h1>Update Package</h1>
//           <form onSubmit={handleSubmit}>
//             <div className="form-group">
//               <label htmlFor="package">Package Name</label>
//               <input
//                 type="text"
//                 className="form-control"
               
//                 name="package"
//                 defaultValue={packageData.package}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="package">Total price</label>
//               <input
//                 type="Number"
//                 className="form-control"
               
//                 name="totalprice"
//                 defaultValue={packageData.totalprice}
                
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea
//                 className="form-control"
//                 name="description"
//                 defaultValue={packageData.description}
//               ></textarea>
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Consider</label>
//               <textarea
//                 className="form-control"
//                 name="note"
//                 defaultValue={packageData.note}
//               ></textarea>
//             </div>
//             <div className="form-group">
//   <label htmlFor="details">Details</label>
//   {[...Array(10)].map((_, index) => {
//     const existingDetail = packageData.details[index] || { activity: "", cost: "" };
//     return (
//       <div key={index}>
//         <label> Activity</label>
//         <input
//           type="text"
//           className="form-control"
//           name={`activity-${index}`}
//           defaultValue={existingDetail.activity}
//         /><br></br>
//         <label>Cost</label>
//         <input
//           type="number"
//           className="form-control"
//           name={`cost-${index}`}
//           defaultValue={existingDetail.cost}
//         />
//         <br></br><br></br>
//       </div>
//     );
//   })}
// </div>

//             <div className="form-group">
//               <label htmlFor="images">Images</label>
//               <label for="images">Select Images:</label>
//           <input
//             type="file"
//             id="images"
//             name="images"
//             accept="image/*"
//             multiple
//             onChange={handleImageChange}
//           />
//           <div id="image-preview"></div>

//             </div>
//             <button type="submit" className="btn btn-primary">
//               Update
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>


// myupdatepackage

return (
  <div>
    <ResponsiveDashBar/>
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-lg-16">
        <h3 text align="center">Update Package</h3><br/>



        
         <form>
        <div class="for">
          <div class="col-25">
        <label>Package Name &nbsp;&nbsp;&nbsp;&nbsp;</label>
        </div>
          <div class="col-50">
            <input type="text" name="package" id="border" />
          </div>
          <br/>
        <div class="col-25">
          <label>Description &nbsp;&nbsp;&nbsp;&nbsp;</label>
        </div>
        <div class="col-50">
          <input type="text" name="description"id="border" /><br/>
        </div>
        <br />
        <div class="col-25">
        <label>Total Price &nbsp;&nbsp;&nbsp;</label>
        </div>
        <div class="col-50">
          <input type="Number" name="total" id="border" />
          </div>
        <br/>
        <div class="col-25">
        <label>Consider &nbsp;&nbsp;&nbsp;&nbsp;</label>
        </div>
        <div class="col-50">
          <input type="Number" name="total" id="border" />
          </div>
        <br /><br/>
        </div>

      </form>  
      </div>
       
 <br/>




    
{/* myyy */}

{/* <div class="update"> */}

 <h3 className="heading">Details</h3>
<table>
{/* <div className="row justify-content-center"> */}
        {/* <tr>
        <th>
          <div class="detail"> */}
    {/* <h3 className="heading">Details</h3> */}
    {/* </div>
        </th>
        </tr> */}
        <tr>
          <td>
            
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]" />
        </div>
        </td>
        </tr>
        
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]"  />
        </div>
        </td>
        </tr>
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]" />
        </div>
        </td>
        </tr>
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]"  />
        </div>
        </td>
        </tr>
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]" />
        </div>
        </td>
        </tr>
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]"  />
        </div>
        </td>
        </tr>
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]" />
        </div>
        </td>
        </tr>
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]"  />
        </div>
        </td>
        </tr>
        <tr>
          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]" />
        </div>
        </td>
        </tr>
        <tr>

          <td>
        <div class="activity">
          <label>Activity:</label>
          <input type="text" name="activity[]" />
        </div>
        </td>
        <td>
        <div class="cost">
          <label>Cost:</label>
          <input type="number" name="cost[]"  />
        </div>
        </td>
        </tr>
        {/* </div> */}
  </table>     
  
  








          {/* <div className="form-group">
<label htmlFor="details">Details</label>
{[...Array(10)].map((_, index) => {
  const existingDetail = packageData.details[index] || { activity: "", cost: "" };
  return (
    <div key={index}>
      <label> Activity</label>
      <input
        type="text"
        className="form-control"
        name={`activity-${index}`}
        defaultValue={existingDetail.activity}
      /><br></br>
      <label>Cost</label>
      <input
        type="number"
        className="form-control"
        name={`cost-${index}`}
        defaultValue={existingDetail.cost}
      />
      <br></br><br></br>
    </div>
  );
})}
</div>  */}

          <div className="form-group">
            <label htmlFor="images">Images</label>
            <label for="images">Select Images:  </label>
        <input
          type="file"
          id="images"
          name="images"
          accept="image/*"
          multiple
          onChange={handleImageChange}
        />
        <div id="image-preview"></div>
        {/* </div> */}

          </div>
          </div>
          <div className="updatebutton">
          <button type="submit" className="btnbtn-primary">
            Update
          </button>
          </div>
        {/* </form> */}
      {/* </div> */}
    </div>






    <Footer/>
    </div>
);
}

export default UpdatePackage;    