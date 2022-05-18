import React from "react";
import { toast } from "react-toastify";
import { Card } from "react-bootstrap";

const MyTasks = ({ task, reload, setReload }) => {
  const { _id, name, description } = task;

  const handleProductDelete = () => {
    const proceed = window.confirm("Do you really want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/task/${_id}`;
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
          <Card.Title>{name}</Card.Title>

          <Card.Text>{description}</Card.Text>

          <div className="d-flex">
            <button className="btn btn-primary mx-1">Complete</button>
            <button
              className="btn btn-danger"
              onClick={() => handleProductDelete()}
            >
              Delete
            </button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyTasks;