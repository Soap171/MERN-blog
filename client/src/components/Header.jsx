import React from "react";
import { Link } from "react-router-dom";
import LogoImg from "../images/Logo.png";
import { useAuthStore } from "../store/authStore";
import { capitalizeFirstLetter } from "../utils/capitalizeFirstLetter";

function Header() {
  const { isLoading, error, logout, user } = useAuthStore();
  const userName = user ? capitalizeFirstLetter(user.name) : "";

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
            {user && (
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  Write
                </Link>
              </li>
            )}

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
                  <Link className="dropdown-item" to="category=Technology">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="?category=Health">
                    Health
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="?category=Lifestyle">
                    Lifestyle
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="?category=Education">
                    Education
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="?category=Finance">
                    Finance
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
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
          {user == null ? (
            <Link className="d-flex btn btn-primary mx-2" to="/login">
              Login
            </Link>
          ) : (
            ""
          )}
          {user && (
            <ul className="navbar-nav p-2">
              <li className="nav-item dropdown">
                <a
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  className="nav-link dropdown-toggle"
                >
                  Hello, {userName}
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
          )}
        </div>
      </div>
    </nav>
  );
}

export default Header;
