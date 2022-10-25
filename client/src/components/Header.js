import React from 'react'

function Header() {
  return (
    <>
  <section className="hero is-white is-fullheight-with-navbar is-fullheight block has-background-info">
  <div className="hero-head has-background-white">
    <nav className="navbar card">
      <div className="container pl-3 is-fullwidth"> 
      <div className="navbar-brand is-size-4 p-1">
        <a className="navbar-item p-3" href="/">
          <h1 className="title tangerine has-text-info animate__animated animate__rubberband p-3">
            <span className="icon is-small mr-5">
              <i className="fas fa-ticket-alt" />
            </span>
            MovieMate    
            <span className="icon is-small ml-5">
              <i className="fas fa-ticket-alt" />
            </span>
          </h1>
        </a>
        <span className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarMenuHeroB">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </span>
      </div>
      <div id="navbarMenuHeroB" className="navbar-menu has-text-right">
        <div className="navbar-end">
          <a className="navbar-item" href="/">
            Movie Search
          </a>
          <a className="navbar-item" href="/profile">
            Profile
          </a>
          <a className="navbar-item" href="/sign-up">
            Reviews
          </a>
          <a className="navbar-item" href="/sign-up">
            Friend Requests
          </a>
          <a className="navbar-item" href="/sign-up">
            Watch Party Invites
          </a>
          <a id="logout" className="navbar-item">
            Logout
          </a>
          <a className="navbar-item" href="/login">
            Login
          </a>
          <a className="navbar-item" href="/sign-up">
            Sign Up
          </a>
        </div>
      </div>
      </div>
    </nav>
  </div>
</section>
</>
    
  )
}

export default Header