import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../images/Logo.png";
import { useAuthStore } from "../store/authStore";

function Header() {
  const { isLoading, error, logout } = useAuthStore();

  const handleSubmit = async () => {
    try {
      await logout();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={LogoImg} alt="" height={45} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">
                Write
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Categories
              </a>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="category=technology">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="category=health">
                    Health
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="category=lifestyle">
                    Lifestyle
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="category=education">
                    Education
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="category=finance">
                    Finance
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary" type="submit">
              Search
            </button>
          </form>
          <ul className="navbar-nav p-2">
            <li className="nav-item dropdown">
              <a
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                className="nav-link dropdown-toggle"
              >
                Username
              </a>
              <ul className="dropdown-menu p-2">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item text-danger"
                    role="button"
                    onClick={handleSubmit}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
