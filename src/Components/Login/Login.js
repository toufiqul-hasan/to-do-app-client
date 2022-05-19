import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Nav, Spinner } from "react-bootstrap";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.init";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });
  const [signInWithEmailAndPassword, user, loading, hookError] =
    useSignInWithEmailAndPassword(auth);

  const handleEmailChange = (event) => {
    const emailValidation = /\S+@\S+\.\S+/;
    const validEmail = emailValidation.test(event.target.value);

    if (validEmail) {
      setUserInfo({ ...userInfo, email: event.target.value });
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Invalid email" });
      setUserInfo({ ...userInfo, email: "" });
    }
  };

  const handlePasswordChange = (event) => {
    const passwordValidation = /.{6,}/;
    const validPassword = passwordValidation.test(event.target.value);

    if (validPassword) {
      setUserInfo({ ...userInfo, password: event.target.value });
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({ ...errors, password: "Invalid password" });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    await signInWithEmailAndPassword(userInfo.email, userInfo.password);
    const email = userInfo.email;
    const { data } = await axios.post("https://lit-atoll-93803.herokuapp.com/login",{ email });
    localStorage.setItem("accessToken", data.accessToken);
  };

  const navigate = useNavigate();
  const from = "/";

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [user, navigate, from]);

  useEffect(() => {
    const error = hookError;
    if (error) {
      switch (error?.code) {
        case "auth/invalid-email":
          toast("Invalid email. Please provide a valid email !");
          break;
        case "auth/wrong-password":
          toast("Wrong password. Please provide a correct password !");
          break;
        default:
          toast("Something went wrong !");
      }
    }
  }, [hookError]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center m-auto">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  return (
    <div className="input-container mt-3 mb-5">
      <div className="title">LOGIN</div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Your Email"
          onChange={handleEmailChange}
          required
        />
        {errors?.email && <p className="error-message">{errors.email}</p>}
        <input
          type="password"
          placeholder="Your Password"
          onChange={handlePasswordChange}
          required
        />
        {errors?.password && <p className="error-message">{errors.password}</p>}
        <br />
        <button className="btn btn-primary">Login</button>
        <br />
        <Nav.Link as={Link} to="/signup">
          Don't have an account? Sign Up!
        </Nav.Link>
        <br />
        <div className="text-center">
        <Link to="/">
          <button className="btn btn-primary">Home</button>
        </Link>
      </div>
      </form>
    </div>
  );
};

export default Login;