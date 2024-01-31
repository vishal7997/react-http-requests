import React, { useRef, useState } from "react";
import "./UserForm.css";

function UserFormExample() {
  let [firstName, setFirstName] = useState("");
  let [fnameIsValid, setFnameIsValid] = useState(true);
  let fNameRef = useRef();

  function onFNameChanged(event) {
    setFirstName(event.target.value);
  }

  function onSubmitHandler(event) {
    event.preventDefault();

    // Reset input values on form submit

    if (firstName.trim() === "") {
      setFnameIsValid(false);
      return;
    }
    setFnameIsValid(true);

    // first approach - ideal
    console.log(firstName);
    setFirstName("");

    // // another approach - not ideal
    // console.log(fNameRef.current.value);
    // fNameRef.current.value = "";
  }

  return (
    <>
      <div id="myModal" className="modal">
        <div className="modal-content">
          {/* <div className="close" onClick={props.closeForm}>
            &times;
          </div> */}
          <h3>Create new user</h3>
          <div className="user-form">
            <form onSubmit={onSubmitHandler}>
              <div>
                <input
                  type="text"
                  placeholder="First name"
                  onChange={onFNameChanged}
                  ref={fNameRef}
                  value={firstName}
                />
                {!fnameIsValid && (
                  <div style={{ fontSize: 14, color: "red" }}>
                    <p>First name is required field</p>
                  </div>
                )}
                <input type="text" placeholder="Last name" />
              </div>
              <div>
                <input type="email" placeholder="Email" />
              </div>
              <div>
                <input type="password" placeholder="Password" />
                <input type="password" placeholder="Confirm Password" />
              </div>
              <div>
                <select name="country">
                  <option value="India">India</option>
                  <option value="Germany">Germany</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                </select>
                <select name="city">
                  <option value="Delhi">Delhi</option>
                  <option value="Berlin">Berlin</option>
                  <option value="New York">New York</option>
                  <option value="London">London</option>
                </select>
              </div>
              <div>
                <input type="date" placeholder="Date of Birth" />
                <select name="gender">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Unknown">Unknown</option>
                </select>
              </div>
              <button className="add-user-button">Create User</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserFormExample;
