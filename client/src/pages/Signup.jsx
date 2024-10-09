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
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import OAuth from "../components/OAuth";
import { validateEmail } from "../utils/validateEmail";
import toast from "react-hot-toast";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, error, signUp } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length < 6) {
      toast.error("Username must be at least 6 characters long.");
    }

    if (!validateEmail(email)) {
      toast.error("Please provide a valid email address.");
    }

    if (password.length < 6 || password.length > 10) {
      toast.error("Password must be between 6 and 10 characters long.");
      return;
    }

    try {
      await signUp(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.error(error);
      toast.error("An error occurred during signup. Please try again.");
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
              feedback="Username must be at least 6 characters long."
              invalid={name.length < 6}
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
              invalid={!validateEmail(email)}
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
              feedback="Password must be between 6 and 10 characters long."
              invalid={password.length < 6 || password.length > 10}
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

            <div className="d-flex justify-content-between  mb-4">
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

          <OAuth />
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default Signup;
