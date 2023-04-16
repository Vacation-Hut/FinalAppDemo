import React ,{useState ,useEffect}from 'react';
import './App.css';
import { Link } from 'react-router-dom';
import pottery from './Appphoto2.png';
import oil from './Appphoto1.png';
import hraft from './Appphoto10.jpg';
import museum from './Appphoto11.jpg';
import beach from './Appphoto5.jpg';
import thinnai from './Appphoto6.jpg';
import ReactDOM from 'react-dom/client';
import axios from 'axios';


function Activity() {


 
  const [data, setData] = useState([]);
  
  useEffect(() => {
    
    
      fetch("http://localhost:5000/allactivity", {
        method: "GET",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data, "activitydata");
          setData(data.data);
        });
      
    },[])
   
   
//     useEffect(() => {

//   axios.get('http://localhost:5000/allactivity') // Update the URL with your API endpoint
    
//       .then(response => {
//         setActivity(allactivity.allactivity);
//       })
//       .catch(error => {
//         console.error('Error fetching activity:', error);
//       });
// },[])
 
  
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
          <a className="nav-link" href="#">Activity</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">User</a>
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
        <button  className="btn btn-outline-primary" type="submit">Search</button>
      </form>
    </div>
  </div>
</nav>
<div>
    <h1 className="activity">Activities</h1>
    <Link className="buttact btn w-500 border" to="/dash/activity/new">Add activity</Link>
    <div className="grid-container">
    <table>
            <thead>
              <tr>
                {/* <th>Image</th> */}
                <th>Activity Name</th>
                <th>Discripion</th>
                <th>Food</th>
                <th>Accommodation</th>
                </tr>
            </thead>
            <tbody>
            {data.map(i =>{
              return (
              <tr key={i.id}>
                <td>{i.activityname}</td>
                <td>{i.discription}</td>
                <td>{i.food}</td>
                <td>{i.accomadation}</td>
              </tr>
            )})}
            
            </tbody>
        </table>
  {/* <div class="grid-item"><img src={pottery} class="aligns"></img><div class="butt"> <Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={oil} class="aligns"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={hraft} class="aligns"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>  
  <div class="grid-item"><img src={museum} class="aligns margins"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={beach} class="aligns margins"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>
  <div class="grid-item"><img src={thinnai} class="aligns margins"></img><div class="butt"><Link class="b1 btn w-500 border" to="/dash/activity/update">Update</Link><button class="b2">Delete</button></div></div>   */}
</div>
</div>
      </div>
    );
  }

  export default Activity;