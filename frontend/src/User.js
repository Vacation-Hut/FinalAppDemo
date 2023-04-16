import React, { useState ,useEffect} from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Validation from "./loginvalidate"
import axios from "axios"


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
      
    },[])
return(
    <div>
         <h1 className="activity">Users</h1>
        <table>
            <thead>
              <tr>
                {/* <th>Image</th> */}
                <th>Name</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Passport Number</th>
                <th>Country</th>
                <th>N.I.C Number</th>
                </tr>
            </thead>
            <tbody>
            {data.map(i =>{
              return (
              <tr key={i.id}>
                <td>{i.name}</td>
                <td>{i.role}</td>
                <td>{i.email}</td>
                <td>{i.phonenumber}</td>
                <td>{i.fname}</td>
                <td>{i.lname}</td>
                <td>{i.nic}</td>
                <td>{i.passportno}</td>
                <td>{i.country}</td>
              </tr>
            )})}
            
            </tbody>
        </table>
    </div>
)
}
export default User