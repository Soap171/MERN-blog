import React from "react";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../services/firebase";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
function OAuth() {
  const { googleAuth, isLoading, error } = useAuthStore();
  const navigate = useNavigate();
  const auth = getAuth(app);
  const handleSubmit = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultFromGoogle = await signInWithPopup(auth, provider);
      console.log(resultFromGoogle);
      await googleAuth(
        resultFromGoogle.user.displayName,
        resultFromGoogle.user.email,
        resultFromGoogle.user.photoURL
      );
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <MDBBtn
      className="mb-4 w-100"
      size="lg"
      style={{ backgroundColor: "#DB4437" }}
      onClick={handleSubmit}
    >
      <MDBIcon fab icon="google" className="mx-2" />
      Continue with Google
    </MDBBtn>
  );
}

export default OAuth;
