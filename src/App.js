import React, { useState } from "react";
import UserForm from "./Components/UserForm";
import "./App.css";
import UserDetails from "./Components/UserDetails";
import axios from "axios";

function App() {
  let [showForm, setShowForm] = useState(false);

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

  return (
    <div>
      <div className="page-header">
        <button className="btn btn-success" onClick={addUserHandler}>
          Add User
        </button>
        <button className="btn btn-normal">Get Users</button>
      </div>
      <UserDetails></UserDetails>
      {showForm && (
        <UserForm closeForm={closeForm} onCreateUser={onCreateUser}></UserForm>
      )}
    </div>
  );
}

export default App;
