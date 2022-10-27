import React from "react";

function Footer() {
  return (
    <>
      <footer className="has-background-info has-text-centered has-text-white mt-auto">
        <p className="mt-5">Movie Mate 2.0 © Group 3</p>
        <br></br>
        <div className="hero-foot">
          <div className="container is-fullwidth">
            <div className="navbar has-background-info is-flex is-justify-content-center">
              <a href="https://github.com/" className="mx-4 has-text-white">
                <i className="fab fa-github" />
              </a>
              <a href="https://facebook.com/" className="mx-4 has-text-white">
                <i className="fab fa-facebook" />
              </a>
              <a href="https://instagram.com/" className="mx-4 has-text-white">
                <i className="fab fa-instagram" />
              </a>
              <a href="https://twitter.com/" className="mx-4 has-text-white">
                <i className="fab fa-twitter" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
