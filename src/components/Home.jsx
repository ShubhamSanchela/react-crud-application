import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    console.log("On Load");
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:1001/users");
    setUser(result.data.reverse());
    console.log(result.data);
  };

  const deleteUser = async (id) => {
    console.log("delete user");
    await axios.delete(`http://localhost:1001/users/${id}`);
    loadUsers();
  };

  return (
    <div className="container">
      <Link to="/users/add">
        <button className="btn btn-primary">Add</button>
      </Link>

      <div className="py-4">
        <h1>Home Page</h1>
        <table className="table table-light table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/users/${user.id}`}>
                    <i class="fas fa-eye"></i>
                  </Link>

                  <Link to={`/users/edit/${user.id}`}>
                    <i class="fas fa-edit"></i>
                  </Link>
                  <Link onClick={() => deleteUser(user.id)}>
                    <i class="far fa-trash-alt"></i>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
