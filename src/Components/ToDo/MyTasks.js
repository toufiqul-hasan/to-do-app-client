import React from "react";
import { Card } from "react-bootstrap";
import { FaCheck, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

const MyTasks = ({ task, reload, setReload }) => {
  const { _id, name, description, completed } = task;
  const handleTaskComplete = () => {
    if (task.completed === false) {
      const completed = task.completed;
      const complete = !completed;
      const newCompleted = { complete };
      const url = `https://to-do-yzxk.onrender.com/task/${_id}`;
      fetch(url, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(newCompleted),
      })
        .then((res) => res.json())
        .then((data) => {
          setReload(!reload);
        });
    } else {
      return;
    }
    toast("Task Completed");
  };

  const handleTaskDelete = () => {
    const proceed = window.confirm("Do you really want to delete?");
    if (proceed) {
      const url = `https://to-do-yzxk.onrender.com/task/${_id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          setReload(!reload);
        });
      toast("Task has been deleted successfully !");
    }
  };

  return (
    <div className="mb-5">
      <Card>
        <Card.Body>
          {completed === true && (
            <Card.Title style={{ textDecoration: "line-through" }}>
              {name}
            </Card.Title>
          )}
          {completed === true && (
            <Card.Title style={{ textDecoration: "line-through" }}>
              {description}
            </Card.Title>
          )}
          {completed === false && <Card.Title> {name} </Card.Title>}
          {completed === false && <Card.Title> {description} </Card.Title>}
          <div className="d-flex">
            <button
              className="btn btn-primary mx-1"
              onClick={() => handleTaskComplete()}
            >
              <FaCheck />
            </button>
            <button
              className="btn btn-danger"
              onClick={() => handleTaskDelete()}
            >
              <FaTrash />
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyTasks;