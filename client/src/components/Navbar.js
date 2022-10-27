import React, { useState } from "react";
import Auth from '../utils/auth' 



const Navbar = () => {
  const [ isActive, setIsActive ] = useState('');

  const handleNavBurger = () => {
    if (!isActive) {
      setIsActive('is-active');
    } else {
      setIsActive('');
    };
  };
    
  return (
    <>
      <section className="hero is-white block has-background-info mb-0">
        <div className="hero-head has-background-white">
          <nav className="navbar card">
            <div className="container is-fullwidth">
              <div className="navbar-brand ">
                <a className="navbar-item p-3" href="/">
                  <h1 className="title tangerine has-text-info animate__animated animate__rubberband p-3 is-size-4-mobile">
                    <span className="icon is-small mr-5">
                      <i className="fas fa-ticket-alt" />
                    </span>
                    MovieMate
                    <span className="icon is-small ml-5">
                      <i className="fas fa-ticket-alt" />
                    </span>
                  </h1>
                </a>
                <span
                  className={`navbar-burger is-align-self-center ${isActive}`}
                  aria-label="menu"
                  aria-expanded="false"
                  data-target="navbarMenuHeroB"
                  onClick={handleNavBurger}
                >
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                  <span aria-hidden="true" />
                </span>
              </div>
              <div id="navbarMenuHeroB" className={`navbar-menu has-text-right has-text-centered-mobile ${isActive}`}>
                <div className="navbar-end">

                  {Auth.loggedIn() ? 
                  <>
                    <a 
                      className="navbar-item" 
                      href="/"
                    >
                      Movie Search
                    </a>
                    <a 
                      className="navbar-item" 
                      href="/profile"
                    >
                      Profile
                    </a>
                    <a 
                      className="navbar-item" 
                      href="/my-reviews"
                    >
                      My Reviews
                    </a>
                    <a 
                      className="navbar-item" 
                      href="/friends"
                    >
                      Friends
                    </a>
                    <a 
                      className="navbar-item" 
                      href="/watch-parties"
                    >
                      Watch Parties
                    </a>
                    {/* eslint-disable-next-line */}
                    <a 
                      id="logout" 
                      className="navbar-item"
                      onClick={Auth.logout}
                    >
                      Logout
                    </a>
                  </>
                  :
                  <>
                    <a className="navbar-item" href="/login">
                      Login
                    </a>
                    <a className="navbar-item" href="/sign-up">
                      Sign Up
                    </a>
                  </>
                  }
                </div>
              </div>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}

export default Navbar;
