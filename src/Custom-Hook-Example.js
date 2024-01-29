import React, { useEffect, useRef, useState } from "react";
// import Increment from "./Components/Increment";
// import Decrement from "./Components/Decrement";

function CustomHookExample() {
  let taskRef = useRef();
  let [allTasks, setAllTasks] = useState([]);
  let [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  // CREATE A NEW TASK
  function createTask() {
    fetch(
      "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks.json",
      {
        method: "POST",
        body: JSON.stringify(taskRef.current.value),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong. Please try again later.");
        }

        fetchTask();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  //   FETCH ALL TASK
  function fetchTask() {
    fetch(
      "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks.json"
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong. Please try again later.");
        }
        return response.json();
      })
      .then((data) => {
        let tasks = [];
        for (let key in data) {
          tasks.push({ id: key, value: data[key] });
        }
        setAllTasks(tasks);
        console.log(tasks);
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }

  //   DELETE A TASK
  function onDeleteTask(task) {
    fetch(
      "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks/" +
        task.id +
        ".json",
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong. Please try again later.");
        }
        fetchTask();
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  }
  return (
    <div>
      <div className="main">
        {/* <Increment></Increment>
        <Decrement></Decrement> */}
        <input type="text" ref={taskRef} />
        <button className="btn btn-create" onClick={createTask}>
          Create
        </button>
      </div>
      {!errorMessage && (
        // <Task tasks={allTasks} onDeleteTask={onDeleteTask}></Task>
        <p>Task component will appear here...!</p>
      )}
      {errorMessage && (
        <div className="task-card">
          <h3>{errorMessage}</h3>
        </div>
      )}
    </div>
  );
}

export default CustomHookExample;
