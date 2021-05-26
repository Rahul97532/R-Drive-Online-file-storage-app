import React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
function NavBar() {
  return (
    <div className="header">
      <Link to="/" className="brand">
        R-Drive
      </Link>
      <Link to="/user" className="User_Profile">
        Profile
      </Link>
    </div>
  );
}

export default NavBar;
