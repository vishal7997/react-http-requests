import React from "react";

function Task(props) {
  function deleteTask(task) {
    props.onDeleteTask(task);
  }
  return (
    <>
      {props.tasks.map((task) => {
        return (
          <div key={task.id}>
            <div>{task.value}</div>
            <button onClick={(event) => deleteTask(task)}>Delete</button>
          </div>
        );
      })}
    </>
  );
}

export default Task;
