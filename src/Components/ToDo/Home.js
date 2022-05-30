import { auth } from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";
import "./Home.css";

const Home = () => {
  
  const [user] = useAuthState(auth);
  return (
    <div className="container text-center mt-3">
      <h1 className="gradient-text mb-5">Welcome to To Do App</h1>
      <div className="gradient-text mb-5">
        {user ? <h2>Welcome Back!</h2> : <h2>Please Login to Continue!</h2>}
      </div>
    </div>
  );
};

export default Home;