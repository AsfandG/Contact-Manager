import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "", status: "" });

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const addUser = async (user) => {
    await axios
      .post("https://638c0a9ed2fc4a058a50fc93.mockapi.io/api/crud", user)
      .then(() => navigate("/"));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addUser(user);
  };

  return (
    <div className="container p-4">
      <form>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="Name"
          value={user.name}
        />{" "}
        <br />
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          placeholder="Email"
          value={user.email}
        />
        <br />
        <label htmlFor="status">Status</label> <br />
        <input
          type="radio"
          name="status"
          onChange={changeHandler}
          value="Active"
          id="status"
        />
        Active
        <input
          type="radio"
          name="status"
          onChange={changeHandler}
          value="Inactive"
          id="status"
        />
        Inactive
        <br />
        <button onClick={submitHandler}>Add User</button>
      </form>
    </div>
  );
};

export default AddUser;
