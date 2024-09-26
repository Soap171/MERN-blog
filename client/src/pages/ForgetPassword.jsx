import React from "react";
import {
  MDBContainer,
  MDBCol,
  MDBValidation,
  MDBValidationItem,
  MDBBtn,
  MDBInput,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import toast from "react-hot-toast";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const { error, passwordForget } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await passwordForget(email);
      console.log(res.message);
      toast.success(res.message);
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <MDBContainer
      fluid
      className="p-3 my-5 d-flex align-items-center justify-content-center vh-100"
      fade-in-down
    >
      <MDBCol md="6">
        <MDBValidation onSubmit={handleSubmit} noValidate>
          <div className="text-center m-3">
            We'll never share your information with anyone else.
          </div>
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
          <div className="text-center">
            <MDBBtn
              type="submit"
              color="primary"
              size="lg"
              className="text-center"
            >
              Send Instructions
            </MDBBtn>
          </div>
        </MDBValidation>
      </MDBCol>
    </MDBContainer>
  );
}

export default ForgetPassword;
