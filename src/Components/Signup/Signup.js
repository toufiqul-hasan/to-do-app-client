import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Nav, Spinner } from "react-bootstrap";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase.init";

const Signup = () => {
  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
    confirmPass: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  const [createUserWithEmailAndPassword, user, loading, hookError] =
    useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

  const handleEmailChange = (event) => {
    const emailValidation = /\S+@\S+\.\S+/;
    const validEmail = emailValidation.test(event.target.value);

    if (validEmail) {
      setUserInfo({ ...userInfo, email: event.target.value });
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Invalid Email" });
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
      setErrors({
        ...errors,
        password: "Password must be six characters long!",
      });
      setUserInfo({ ...userInfo, password: "" });
    }
  };

  const handleConfirmPasswordChange = (event) => {
    if (event.target.value === userInfo.password) {
      setUserInfo({ ...userInfo, confirmPass: event.target.value });
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({ ...errors, password: "Password did not match!" });
      setUserInfo({ ...userInfo, confirmPass: "" });
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    createUserWithEmailAndPassword(userInfo.email, userInfo.password);
  };

  useEffect(() => {
    if (hookError) {
      switch (hookError?.code) {
        case "auth/invalid-email":
          toast("Invalid email. Please provide a valid email !");
          break;
        case "auth/invalid-password":
          toast("Invalid password. Please provide a valid password !");
          break;
        default:
          toast("Something went wrong !");
      }
    }
  }, [hookError]);

  const navigate = useNavigate();
  const from = "/login";

  useEffect(() => {
    if (user) {
      navigate(from);
    }
  }, [from, navigate, user]);

  if (loading) {
    return (
      <div className="d-flex align-items-center justify-content-center m-auto">
        <Spinner animation="border" variant="dark" />
      </div>
    );
  }

  return (
    <div className="input-container mt-3 mb-5">
      <div className="title">SIGN UP</div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Your Email"
          onChange={handleEmailChange}
          required
        />
        {errors?.email && <p className="error-message">{errors.email}</p>}
        <div>
          <input
            type="password"
            placeholder="Your Password"
            onChange={handlePasswordChange}
            required
          />
          {errors?.password && (
            <p className="error-message">{errors.password}</p>
          )}
        </div>
        <input
          type="password"
          placeholder="Confirm Password"
          onChange={handleConfirmPasswordChange}
          required
        />
        <br />
        <button className="btn btn-primary">Sign up</button>
      </form>
      <br />
      <div className="d-flex align-items-center">
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
        <p className="mt-2 px-2">Or</p>
        <div style={{ height: "1px" }} className="bg-primary w-50"></div>
      </div>
      <Nav.Link as={Link} to="/login">
        Already have an account? Login!
      </Nav.Link>
    </div>
  );
};

export default Signup;