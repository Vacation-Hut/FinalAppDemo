import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Validation from "./signupvalidate"
import axios from "axios"

function Signup() {
    const [error, setError] = useState({})
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    async function submit(e) {
        e.preventDefault();
        setError(Validation(name, email, password));
        try {
            if (error.name === "" && error.email === "" && error.password === "") {
                await axios.post("http://localhost:5000/signup", {
                    name, email, password
                })
                Navigate("/")
            }
        }
        catch (error) {
            console.log(error)

        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h1>Sign Up</h1>
                <form action="" onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" placeholder="Name" className="form-control rounded-0" onChange={(e) => { setName(e.target.value) }}></input>
                        {error.name && <span className="text-danger"> {error.name}</span>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" className="form-control rounded-0" name="email" onChange={(e) => { setEmail(e.target.value) }}></input>
                        {error.email && <span className="text-danger"> {error.email}</span>}

                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" className="form-control rounded-0" name="password" onChange={(e) => { setPassword(e.target.value) }}></input>
                        {error.password && <span className="text-danger"> {error.password}</span>}
                    </div>
                    <button type="submit" className="btn btn-danger w-100">Sign Up</button>
                    <p>You are agree our terms and conditions</p>
                    <Link to="/" className="btn border w-100">Log In</Link>
                </form>
            </div>
        </div>
    )
}



export default Signup