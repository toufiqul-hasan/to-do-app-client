import { Link } from "react-router-dom";
import { auth } from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const ToDo = () => {
  const [user] = useAuthState(auth);
  return (
    <div className="text-center">
      <h1>Welcome to To Do App</h1>
      {user ? "" : <p>Please Login to continue!</p>}
      {user ? (
        <Link to="/mytask">
          <button className="btn btn-primary">My Task</button>
        </Link>
      ) : (
        <Link to="/login">
          <button className="btn btn-primary">Login</button>
        </Link>
      )}
    </div>
  );
};

export default ToDo;