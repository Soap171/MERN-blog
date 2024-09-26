import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { error: resetError, passwordReset } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validPassword = true;
    let validConfirmPassword = true;

    // Clear previous errors
    setPasswordError("");
    setConfirmPasswordError("");

    // Validate password
    if (password === "") {
      setPasswordError("Please provide a password");
      validPassword = false;
      console.log("Please provide a password");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      console.log("Password must be at least 6 characters");
      validPassword = false;
    }

    // Validate confirm password
    if (confirmPassword === "") {
      setConfirmPasswordError("Please confirm your password");
      console.log("Please confirm your password");
      validConfirmPassword = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      console.log("Passwords do not match");
      validConfirmPassword = false;
    }

    if (validPassword && validConfirmPassword) {
      try {
        const res = await passwordReset(token, password);
        console.log(res.data);
        toast.success("Password reset successfully");
        setTimeout(() => navigate("/login"), 2000);
      } catch (error) {
        toast.error(resetError);
        console.log(resetError);
      }
    }
  };

  return (
    <>
      <MDBContainer
        fluid
        className="p-3 my-5 d-flex align-items-center justify-content-center vh-100 fade-in"
      >
        <MDBCol md="6">
          <MDBValidation onSubmit={handleSubmit} noValidate>
            <div className="text-center m-3">Reset Your Password</div>
            <div className="mb-4">
              <MDBInput
                label="New Password"
                id="new-password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="off"
              />
              {passwordError && (
                <MDBValidationItem valid={false} className="text-danger">
                  {passwordError}
                </MDBValidationItem>
              )}
            </div>
            <div className="mb-4">
              <MDBInput
                label="Confirm Password"
                id="confirm-password"
                type="password"
                size="lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="off"
              />
              {confirmPasswordError && (
                <MDBValidationItem valid={false} className="text-danger">
                  {confirmPasswordError}
                </MDBValidationItem>
              )}
            </div>

            <MDBBtn
              type="submit"
              color="primary"
              size="lg"
              className="text-center my-2"
            >
              Reset Password
            </MDBBtn>
          </MDBValidation>
        </MDBCol>
      </MDBContainer>
    </>
  );
}

export default PasswordReset;
