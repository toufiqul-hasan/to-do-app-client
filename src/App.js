import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Login from "./Components/Login/Login";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import Signup from "./Components/Signup/Signup";
import AddTask from "./Components/ToDo/AddTask";
import MyTask from "./Components/ToDo/MyTask";
import ToDo from "./Components/ToDo/ToDo";

function App() {
  return (
    <div className="container mt-5">
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/mytask"
          element={
            <RequireAuth>
              <MyTask />
            </RequireAuth>
          }
        />
        <Route
          path="/addtask"
          element={
            <RequireAuth>
              <AddTask />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;