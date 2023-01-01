import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="container p-1 nav">
        <h1>Contact Manager</h1>
        <Link to="/">Users</Link>
      </div>
    </nav>
  );
};

export default Navbar;
