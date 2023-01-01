import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";

const User = ({ id, name, email, status, fetchUsers }) => {
  const deleteHandler = async (id) => {
    await axios
      .delete(`https://638c0a9ed2fc4a058a50fc93.mockapi.io/api/crud/${id}`)
      .then(() => fetchUsers());
    // console.log("deleting user", id);
  };

  return (
    <div className="user">
      <article className="info">
        <div className="profile-pic">
          <img src="user.png" alt="User" />
        </div>
        <div className="about">
          <h4>{name}</h4>
          <p>{email}</p>
          <p style={{ color: status === "Active" ? "green" : "red" }}>
            {status}
          </p>
        </div>
      </article>
      <div className="actions">
        <Link to={`/update/${id}`}>
          <button className="edit-btn">
            <FaEdit />
          </button>
        </Link>

        <button className="delete-btn" onClick={() => deleteHandler(id)}>
          <RiDeleteBin6Line />
        </button>
      </div>
    </div>
  );
};

export default User;
