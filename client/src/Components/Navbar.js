import React from 'react'
import { Link } from 'react-router-dom'
import("../App.css")
const Navbar = () => {
  return (
    <div>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/signin">SignIn</Link>
        <Link to="/signup">SignUp</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/logout">LogOut</Link>
    </div>
  )
}

export default Navbar