import React, { useEffect, useState } from "react";
import UserForm from "./Components/UserForm";
import "./App.css";
import UserDetails from "./Components/UserDetails";
import axios from "axios";
import Loader from "./Components/Loader";

function App() {
  let [showForm, setShowForm] = useState(false);
  let [users, setUsers] = useState([]);
  let [loading, setLoading] = useState(false);
  let [errorMessage, setErrorMessage] = useState(null);
  let [editMode, setEditMode] = useState(false);
  let [userToEdit, setUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  function addUserHandler() {
    setEditMode(false);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
  }

  function onCreateUser(user) {
    if (!editMode) {
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
          fetchUsers();
          // setShowForm(false);
        });
    } else {
      console.log(user);
      console.log(userToEdit);
      axios
        .put(
          "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users/" +
            userToEdit.id +
            ".json",
          user
        )
        .then((response) => {
          console.log(response);
          fetchUsers();
          // setShowForm(false);
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
    setShowForm(false);
  }

  function fetchUsers() {
    setLoading(true);
    setErrorMessage(null);

    fetch(
      "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users.json"
      // { // if we dont specify second parameter to fetch api, by default it will work as a GET api.
      //   method: "GET",
      //   headers: {
      //     "content-type": "application/json",
      //   },
      // }
    )
      .then((resp) => {
        if (!resp.ok) {
          throw new Error("Something went wrong!");
        }
        return resp.json();
      })
      .then((data) => {
        let userData = [];
        for (let key in data) {
          userData.push({ ...data[key], id: key });
        }
        // console.log(userData);
        setUsers(userData);
        setLoading(false);
      })
      .catch((error) => {
        setErrorMessage(error.message);
        setLoading(false);
      });

    // axios
    //   .get(
    //     "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users.json"
    //     // { // if we dont specify second parameter to fetch api, by default it will work as a GET api.
    //     //   method: "GET",
    //     //   headers: {
    //     //     "content-type": "application/json",
    //     //   },
    //     // }
    //   )
    //   .then((resp) => {
    //     return resp.data;
    //   })
    //   .then((data) => {
    //     let userData = [];
    //     for (let key in data) {
    //       userData.push({ ...data[key], id: key });
    //     }
    //     // console.log(userData);
    //     setUsers(userData);
    //     setLoading(false);
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message);
    //     setLoading(false);
    //   });
  }

  function onEditUser(user) {
    setEditMode(true);
    setUser(user);
    setShowForm(true);
  }

  function onDeleteUser(user) {
    let del = window.confirm(
      "Do you really want to delete the record of " +
        user.firstName +
        " " +
        user.lastName +
        "?"
    );
    if (del) {
      axios
        .delete(
          "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/users/" +
            user.id +
            ".json"
        )
        .then((response) => {
          console.log(response);
          fetchUsers();
        })
        .catch((error) => {
          setErrorMessage(error.message);
        });
    }
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
      {!loading && !errorMessage && (
        <UserDetails
          users={users}
          onEditUser={onEditUser}
          onDeleteUser={onDeleteUser}
        ></UserDetails>
      )}
      {errorMessage && <h3 style={{ textAlign: "center" }}>{errorMessage}</h3>}
      {loading && <Loader></Loader>}
      {showForm && (
        <UserForm
          closeForm={closeForm}
          onCreateUser={onCreateUser}
          editMode={editMode}
          user={userToEdit}
        ></UserForm>
      )}
    </div>
  );
}

export default App;
