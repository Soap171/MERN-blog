import "./App.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation().pathname;
  return (
    <div className="App">
      {location === "/" || location === "/sign-up" ? "" : <Header />}

      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      {location === "/" || location === "/sign-up" ? "" : <Footer />}
    </div>
  );
}

export default App;
