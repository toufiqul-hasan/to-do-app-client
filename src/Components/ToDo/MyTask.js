import React, { useEffect, useState } from "react";
import { auth } from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import { Spinner } from "react-bootstrap";
import axiosPrivate from "../../api/axiosPrivate";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import MyTasks from "./MyTasks";

const MyTask = () => {
  const [user] = useAuthState(auth);
  const [task, setTask] = useState([]);
  const [reload, setReload] = useState(true);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    
    const getTasks = async () => {
      const email = user.email;
      const url = `https://to-do-yzxk.onrender.com/mytask?email=${email}`;
      try {
        const { data } = await axiosPrivate.get(url);
        setTask(data);
        setLoading(false);
      } catch (error) {
        if (error.response.status === 401 || error.response.status === 403) {
          signOut(auth);
          navigate("/login");
        }
      }
    };
    getTasks();
  }, [user, reload, navigate]);

  return (
    <>
      {loading ? (
        <div className="d-flex align-items-center justify-content-center my-auto">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <div className="container">
          <div className="title mt-3 mb-5">MY TASK</div>
          <div>
            {task.map((task) => (
              <MyTasks
                key={task._id}
                task={task}
                reload={reload}
                setReload={setReload}
              ></MyTasks>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyTask;