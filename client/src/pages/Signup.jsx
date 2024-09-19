import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBValidation,
  MDBValidationItem,
} from "mdb-react-ui-kit";
import LogoImg from "../images/Logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, signUp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(name, email, password);
      navigate("/");
    } catch (error) {
      console.error(error);
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
              feedback="Please choose a username."
              invalid
              className="mb-4"
            >
              <MDBInput
                label="Username"
                id="formControlLg"
                type="text"
                size="lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </MDBValidationItem>

            <MDBValidationItem
              feedback="Please provide a valid email address."
              invalid
              className="mb-4"
            >
              <MDBInput
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
              feedback="Please provide a password."
              invalid
              className="mb-4"
            >
              <MDBInput
                label="Password"
                id="formControlLg"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </MDBValidationItem>

            <div className="d-flex justify-content-between mx-4 mb-4">
              <Link to="/login">Already a member?</Link>
            </div>

            <MDBBtn
              className="mb-4 w-100"
              size="lg"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Sign Up"}
            </MDBBtn>
          </MDBValidation>
          {error && <p className="text-danger text-center">{error}</p>}

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#3b5998" }}
          >
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Continue with Facebook
          </MDBBtn>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#DB4437" }}
          >
            <MDBIcon fab icon="google" className="mx-2" />
            Continue with Google
          </MDBBtn>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
