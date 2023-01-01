import React from "react";
import { useState, useEffect } from "react";
import User from "./User";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoPersonAdd } from "react-icons/io5";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState();
  const [sort, setSort] = useState("");

  const sortOptions = ["name", "email", "status"];

  const fetchUsers = async () => {
    try {
      const res = await axios.get(
        "https://638c0a9ed2fc4a058a50fc93.mockapi.io/api/crud"
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const changeHandler = (e) => {
    setSearch(e.target.value);
  };

  const searchHandler = async () => {
    await axios
      .get(
        `https://638c0a9ed2fc4a058a50fc93.mockapi.io/api/crud?search=${search}`
      )
      .then((res) => {
        setUsers(res.data);
        setSearch("");
      });
  };

  const sortHandler = async (e) => {
    const value = e.target.value;
    setSort(value);
    await axios
      .get(
        `https://638c0a9ed2fc4a058a50fc93.mockapi.io/api/crud?sortBy=${value}&order=asc`
      )
      .then((res) => {
        setUsers(res.data);
      });
  };

  const resetHandler = async () => {
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <section className="container p-4 users">
        <pre style={{ textAlign: "center" }}>
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search Name..."
            className="search-input"
            onChange={changeHandler}
            value={search}
          />
          <button
            type="submit"
            className="btn-primary search-btn"
            onClick={searchHandler}
          >
            Search
          </button>
          <button className="btn-info" onClick={resetHandler}>
            Reset
          </button>
        </pre>

        <section className="flex justify-content-between">
          {/* sort */}
          <div className="sort">
            <h3>Sort By: </h3>
            <select onChange={sortHandler} value={sort} className="">
              <option className="form-option">Please select option</option>
              {sortOptions.map((option, index) => (
                <option value={option} key={index} className="form-option">
                  {option}
                </option>
              ))}
            </select>
          </div>
          {/* filter */}
          <div className="filter">
            <h3>Filter By Status:</h3>
            <select>
              <option value="">Please select status</option>
              <option value="">Active</option>
              <option value="">Inactive</option>
            </select>
          </div>
        </section>
        <section className="header">
          <h2>Contact List</h2>
          <Link to="/addUser">
            <button className="btn-primary">
              <IoPersonAdd /> Add User
            </button>
          </Link>
        </section>
        <div className="user-grid">
          {users.map((user) => (
            <User
              key={user.id}
              id={user.id}
              name={user.name}
              email={user.email}
              status={user.status}
              fetchUsers={fetchUsers}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Users;
