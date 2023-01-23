import React from "react";
import { toast } from "react-toastify";
import { auth } from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const AddTask = () => {
  const [user] = useAuthState(auth);
  const handleAddItem = (event) => {
    event.preventDefault();
    const email = user.email;
    const completed = false;
    const name = event.target.name.value;
    const description = event.target.description.value;
    const info = { email, completed, name, description };

    fetch("https://to-do-yzxk.onrender.com/task", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(info),
    })
      .then((res) => res.json())
      .then((data) => {
        toast("Task has been added successfully!");
        event.target.reset();
      });
  };

  return (
    <div className="container input-container mt-3 mb-5">
      <div className="title">ADD TASK</div>
      <form className="login-form" onSubmit={handleAddItem}>
        <input name="name" type="text" placeholder="Task Name" required />
        <textarea
          name="description"
          type="text"
          placeholder="Task Description"
          required
        />
        <br />
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default AddTask;
