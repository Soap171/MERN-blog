import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgetPassword from "./pages/ForgetPassword";
import PasswordReset from "./pages/PasswordReset";
import Header from "./components/Header";
import Write from "./pages/Write";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import { Children, useEffect } from "react";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();

  //protected routes
  const ProtectedRoutes = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (!user.isVerified) {
      return <Navigate to="/verify-email" />;
    }

    return children;
  };

  //redirect to home if user is authenticated
  const RedirectAuthenticatedUser = ({ children }) => {
    const { isAuthenticated, user } = useAuthStore();

    if (isAuthenticated && user.isVerified) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  console.log("Is the user authenticated?", isAuthenticated);
  console.log("user", user);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route
          path="/login"
          element={
            <RedirectAuthenticatedUser>
              <Login />
            </RedirectAuthenticatedUser>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectAuthenticatedUser>
              <Signup />
            </RedirectAuthenticatedUser>
          }
        />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/blog" element={<Write />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoutes>
              <Profile />
            </ProtectedRoutes>
          }
        />
        <Route path="/verify-email" element={<VerifyEmail />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
