import React from 'react'

function Footer() {
  return (
    <div>
       <footer className="has-background-white has-text-centered has-text-black py-3 is-bottom">
  <p>
    Movie Mate 2.0 © Group 3
  </p>
  <div className="hero-foot is-borderless">
    <nav className="tabs is-centered">
      <div className="container">
        <ul>
          <li>
            <a><i className="fab fa-github" /></a>
          </li>
          <li>
            <a><i className="fab fa-facebook" /></a>
          </li>
          <li>
            <a><i className="fab fa-instagram" /></a>
          </li>
          <li>
            <a><i className="fab fa-twitter" /></a>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</footer>

    </div>
  )
}

export default Footer