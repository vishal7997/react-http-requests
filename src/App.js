import React, { useState } from "react";
import UserForm from "./Components/UserForm";
import "./App.css";
import UserDetails from "./Components/UserDetails";
import axios from "axios";

function App() {
  let [showForm, setShowForm] = useState(false);
  let [users, setUsers] = useState([]);

  function addUserHandler() {
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  function onCreateUser(user) {
    // one way to use HTTP requests in react
    // fetch(
    //   "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users.json",
    //   {
    //     method: "POST",
    //     body: JSON.stringify(user),
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }
    // ).then((resp) => {
    //   console.log(resp);
    // });

    // another way to use HTTP requests in react : using AXIOS library
    axios
      .post(
        "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users.json",
        user
      )
      .then((response) => {
        console.log(response.data);
      });
  }

  function fetchUsers() {
    // fetch(
    //   "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users.json"
    //   // { // if we dont specify second parameter to fetch api, by default it will work as a GET api.
    //   //   method: "GET",
    //   //   headers: {
    //   //     "content-type": "application/json",
    //   //   },
    //   // }
    // )
    //   .then((resp) => {
    //     return resp.json();
    //   })
    //   .then((data) => {
    //     let userData = [];
    //     for (let key in data) {
    //       userData.push({ ...data[key], id: key });
    //     }
    //     // console.log(userData);
    //     setUsers(userData);
    //   });

    axios
      .get(
        "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users.json"
        // { // if we dont specify second parameter to fetch api, by default it will work as a GET api.
        //   method: "GET",
        //   headers: {
        //     "content-type": "application/json",
        //   },
        // }
      )
      .then((resp) => {
        return resp.data;
      })
      .then((data) => {
        let userData = [];
        for (let key in data) {
          userData.push({ ...data[key], id: key });
        }
        // console.log(userData);
        setUsers(userData);
      });
  }

  return (
    <div>
      <div className="page-header">
        <button className="btn btn-success" onClick={addUserHandler}>
          Add User
        </button>
        <button className="btn btn-normal" onClick={fetchUsers}>
          Get Users
        </button>
      </div>
      <UserDetails users={users}></UserDetails>
      {showForm && (
        <UserForm closeForm={closeForm} onCreateUser={onCreateUser}></UserForm>
      )}
    </div>
  );
}

export default App;
