import React from "react";
import "../components/style.css";

function Loader() {
  return (
    <div className="loader-container">
      <div className="spinner-grow text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
