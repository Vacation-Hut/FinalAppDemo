import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Validation from "./loginvalidate"
import axios from "axios"

function Login() {
    const Navigate = useNavigate();
    const [error, setError] = useState({})
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    async function submit(e) {
        e.preventDefault();
        setError(Validation(email, password));
        try {
            if (error.email === "" && error.password === "")
                await axios.post("http://localhost:5000/login", {
                    email, password
                })

            // history("/admin")
            Navigate("/")
        }
        catch (error) {
            console.log(error)

        }
    }
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h1>Log In</h1>
                <form action="" onSubmit={submit}>
                    <div className="mb-3">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Email" className="form-control rounded-0" onChange={(e) => { setEmail(e.target.value) }} name="email"></input>
                        {error.email && <span className="text-danger"> {error.email}</span>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Password" className="form-control rounded-0" onChange={(e) => { setPassword(e.target.value) }} name="password"></input>
                        {error.password && <span className="text-danger"> {error.password}</span>}

                    </div>
                    <button type="submit" className="btn btn-danger w-100">Log in</button>
                    <p>You are agree our terms and conditions</p>
                    <Link to="/signup" className="btn border w-100">Create Account</Link>
                </form>
            </div>
        </div>
    )
}

export default Login