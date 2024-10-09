import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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
import { useEffect, useState } from "react";
import Loader from "./utils/Loader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Contact from "./pages/Contact";
import About from "./pages/About";

function App() {
  const { isCheckingAuth, checkAuth, isAuthenticated, user } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const queryClient = new QueryClient();

  useEffect(() => {
    const checkAuthentication = async () => {
      await checkAuth();
      setTimeout(() => setLoading(false), 1000);
    };

    checkAuthentication();
  }, [checkAuth]);

  if (loading) {
    return (
      <>
        <Loader />
      </>
    );
  }

  // Protected routes
  const ProtectedRoutes = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }

    if (user && !user.isVerified) {
      return <Navigate to="/verify-email" />;
    }

    return children;
  };

  // Redirect to home if user is authenticated and trying to access login, signup, or verify email pages
  const RedirectAuthenticatedUser = ({ children }) => {
    const location = useLocation();
    const restrictedPaths = [
      "/login",
      "/signup",
      "/verify-email",
      "/forget-password",
      "/reset-password/:token",
    ];

    if (
      isAuthenticated &&
      user &&
      user.isVerified &&
      restrictedPaths.includes(location.pathname)
    ) {
      return <Navigate to="/" replace />;
    }

    return children;
  };

  console.log("Is the user authenticated?", isAuthenticated);
  console.log("user", user);

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
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
          <Route
            path="/forget-password"
            element={
              <RedirectAuthenticatedUser>
                <ForgetPassword />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/reset-password/:token"
            element={
              <RedirectAuthenticatedUser>
                <PasswordReset />
              </RedirectAuthenticatedUser>
            }
          />
          <Route
            path="/write/:id"
            element={
              <ProtectedRoutes>
                <Write />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/write/"
            element={
              <ProtectedRoutes>
                <Write />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/verify-email"
            element={
              <RedirectAuthenticatedUser>
                <VerifyEmail />
              </RedirectAuthenticatedUser>
            }
          />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
