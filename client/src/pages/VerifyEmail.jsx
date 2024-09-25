import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../components/style.css";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function VerifyEmail() {
  const [code, setCode] = useState(new Array(6).fill(""));
  const { isLoading, error, verifyEmail, checkAuth } = useAuthStore();
  const navigate = useNavigate();

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setCode([...code.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await verifyEmail(code.join(""));
      await checkAuth();
      navigate("/");
      toast.success("Email Verified Successfully");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="container verify-email-container">
        <h2 className="text-center mb-4">Verify Your Email</h2>
        <form onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center mb-3">
            {code.map((data, index) => {
              return (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  className="form-control verify-input mx-1 text-center"
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              );
            })}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </button>
          </div>
          {error && (
            <div className="alert alert-danger mt-3 text-center">{error}</div>
          )}
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
