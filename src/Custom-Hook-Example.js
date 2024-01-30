import React, { useEffect, useRef, useState } from "react";
import useHttp from "./Components/Utilities/use-http";
// import Increment from "./Components/Increment";
// import Decrement from "./Components/Decrement";

function CustomHookExample() {
  let taskRef = useRef();
  let [errorMessage, setErrorMessage] = useState(null);
  let [allTasks, setAllTasks] = useState([]);
  let [errorGet, sendGetRequest] = useHttp(
    "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks.json",
    "GET",
    null,
    getAllTasks
  );

  let [errorPost, sendPostRequest] = useHttp(
    "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks.json",
    "POST",
    taskRef.current.value,
    createTask
  );

  function getAllTasks(data) {
    data.then((tasks) => {
      let taskList = [];
      for (let key in tasks) {
        taskList.push({ id: key, value: tasks[key] });
      }
      // console.log(tasks);
      setAllTasks(taskList);
    });
    setErrorMessage(errorGet);
  }

  useEffect(() => {
    sendGetRequest();
  }, []);

  // CREATE A NEW TASK
  function createTask(data) {
    sendPostRequest();
    sendGetRequest();
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
        // fetchTask();
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
