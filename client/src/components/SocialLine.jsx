import React from "react";
import { BsFacebook } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import { Link } from "react-router-dom";

function SocialLine() {
  return (
    <div className="container-fluid py-2" id="contact">
      <div className="row text-center">
        <div className="col-sm-6 col-lg-3 py-5">
          <div className=" mb-5">
            <Link to="https://www.facebook.com/profile.php?id=100088473447425&mibextid=ZbWKwL">
              <BsFacebook size={75} />
            </Link>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 py-5">
          <div className=" mb-5">
            <Link to="https://www.linkedin.com/in/sachinthana-jayathunga-b889a526b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">
              <BsLinkedin size={75} />
            </Link>
          </div>
        </div>
        <div className="col-sm-6 col-lg-3 py-5">
          <div className=" mb-5">
            <Link to="https://wa.me/+94771908671">
              <BsWhatsapp size={75} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SocialLine;
