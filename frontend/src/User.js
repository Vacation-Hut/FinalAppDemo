import React, { useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import Validation from "./loginvalidate"
import axios from "axios"


function User() {
return(
    <div>
        <table>
            <tr>
                <th>User name</th>
                <th>Role</th>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Edit</th>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </table>
    </div>
)
}
export default User