import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import LogoImg from "../images/Logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";
import OAuth from "../components/OAuth";
import { validateEmail } from "../utils/validateEmail";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, login } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Please provide a valid email address.");
    }

    if (password.length < 6 || password.length > 10) {
      toast.error("Password must be between 6 and 10 characters long.");
      return;
    }

    try {
      await login(email, password);
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5 p-5">
      <MDBRow>
        <MDBCol col="8" md="6">
          <img src={LogoImg} className="img-fluid" alt="logo" />
        </MDBCol>

        <MDBCol col="4" md="6">
          <MDBValidation onSubmit={handleSubmit} noValidate>
            <MDBValidationItem
              invalid={!validateEmail(email)}
              feedback="Please provide a valid email address."
              className="mb-4"
            >
              <MDBInput
                wrapperClass="mb-4"
                label="Email address"
                id="formControlLg"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </MDBValidationItem>
            <MDBValidationItem
              invalid={password.length < 6 || password.length > 10}
              feedback="Password must be between 6 and 10 characters long."
              className="mb-4"
            >
              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </MDBValidationItem>

            <div className="d-flex justify-content-between mx-2 mb-4 mt-4">
              <Link to="/signup">Don't have an account?</Link>
              <Link to="/forget-password">Forgot password?</Link>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </MDBBtn>
            {error && (
              <div className="alert alert-danger mt-3 text-center">{error}</div>
            )}
          </MDBValidation>

          <OAuth />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Login;
