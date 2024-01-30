import React, { useEffect, useRef, useState } from "react";
import useHttp from "./Components/Utilities/use-http";
import Task from "./Components/Task";
// import Increment from "./Components/Increment";
// import Decrement from "./Components/Decrement";

function CustomHookExample() {
  let taskRef = useRef();
  let [errorMessage, setErrorMessage] = useState(null);
  let [allTasks, setAllTasks] = useState([]);
  let [errorGet, sendGetRequest] = useHttp();

  let [errorPost, sendPostRequest] = useHttp();
  let [errorDelete, sendDeleteRequest] = useHttp();

  function getAllTasks(data) {
    data.then((tasks) => {
      let taskList = [];
      for (let key in tasks) {
        taskList.push({ id: key, value: tasks[key] });
      }
      console.log(taskList);
      setAllTasks(taskList);
    });
    setErrorMessage(errorGet);
  }

  useEffect(() => {
    onFetchTasks();
  }, []);

  // CREATE A NEW TASK
  function createTask() {
    sendPostRequest(
      "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks.json",
      "POST",
      taskRef.current.value,
      onCreateTask
    );
  }

  function onCreateTask(data) {
    // DO NOTHING
    data.then((d) => {
      console.log(d);
      onFetchTasks();
    });
  }

  function onFetchTasks() {
    sendGetRequest(
      "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks.json",
      "GET",
      null,
      getAllTasks
    );
  }

  //   DELETE A TASK
  function deleteTask(task) {
    // fetch(
    //   "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks/" +
    //     task.id +
    //     ".json",
    //   {
    //     method: "DELETE",
    //   }
    // )
    //   .then((response) => {
    //     if (!response.ok) {
    //       throw new Error("Something went wrong. Please try again later.");
    //     }
    //     // fetchTask();
    //   })
    //   .catch((error) => {
    //     setErrorMessage(error.message);
    //   });

    sendDeleteRequest(
      "https://react-http-tutorial-7f40e-default-rtdb.firebaseio.com/tasks/" +
        task.id +
        ".json",
      "DELETE",
      null,
      onDeleteTask
    );
  }

  function onDeleteTask(data) {
    data.then((d) => {
      onFetchTasks();
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
        <Task tasks={allTasks} onDeleteTask={deleteTask}></Task>
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
