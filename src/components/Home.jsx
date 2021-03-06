import React, { useState, useEffect } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

{
  /* <h1>Run Command : "npm run start:dev"</h1> */
}

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
      <div className="py-4">
        <Link to="/users/add" aria-current="page">
          <button className="btn btn-primary">Add User</button>
        </Link>
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
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link to={`/users/${user.id}`}>
                    <i className="fas fa-eye"></i>
                  </Link>

                  <Link to={`/users/edit/${user.id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <a onClick={() => deleteUser(user.id)}>
                    <i
                      className="far fa-trash-alt"
                      style={{ cursor: "pointer" }}
                    ></i>
                  </a>
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
