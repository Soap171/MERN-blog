import React from "react";
import aboutImg from "../images/Logo.png";

function About() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center p-5">
        <div className="col-md-6 text-center">
          <img src={aboutImg} className="img-fluid" alt="About us" />
        </div>
        <div className="col-md-6">
          <h2 className="text-muted">About Us</h2>
          <p>
            Welcome to our blog! Here, we share insights, stories, and updates
            on a variety of topics that matter to you. Our mission is to provide
            valuable content that informs, inspires, and engages our readers.
          </p>
          <p>
            Our team is composed of passionate writers, researchers, and
            enthusiasts who are dedicated to bringing you the best content
            possible. We cover a wide range of subjects, from technology and
            productivity to lifestyle and personal development.
          </p>
          <p>
            Whether you're looking for tips to boost your productivity, the
            latest tech trends, or simply some inspiration for your day, you'll
            find it here. We believe in the power of knowledge and the
            importance of staying informed in today's fast-paced world.
          </p>
          <p>
            Thank you for visiting our blog. We hope you enjoy reading our posts
            as much as we enjoy creating them. Stay tuned for more updates, and
            feel free to reach out to us with any questions or feedback.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
