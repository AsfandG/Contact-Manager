import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  const changeHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const Update = async (user) => {
    await axios
      .put(`https://638c0a9ed2fc4a058a50fc93.mockapi.io/api/crud/${id}`, user)
      .then(() => navigate("/"));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    Update(user);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      await axios
        .get(`https://638c0a9ed2fc4a058a50fc93.mockapi.io/api/crud/${id}`)
        .then((res) => setUser(res.data));
    };
    fetchUserData();
  }, [id]);
  return (
    <div className="container p-4">
      <h1>Fetching data of id: {id}</h1>
      <form>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="Name"
          value={user.name}
        />
        <input
          type="email"
          name="email"
          onChange={changeHandler}
          placeholder="Email"
          value={user.email}
        />
        <button onClick={submitHandler}>Update User</button>
      </form>
    </div>
  );
};

export default Update;
