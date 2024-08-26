import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/signUp";
import ForgetPassword from "./pages/forgetPassword";
import VerifyEmail from "./pages/verifyEmail";
import ResetPassword from "./pages/resetPassword";
import Home from "./pages/Home";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </>
  );
}

export default App;
