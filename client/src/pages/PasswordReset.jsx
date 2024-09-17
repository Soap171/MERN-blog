import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";

function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleSubmit = (e) => {
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
      console.log("Password reset successfully");
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
