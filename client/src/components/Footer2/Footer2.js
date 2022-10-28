import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'


function Footer2() {
  return (
    <footer className='footer-container'>
      <section class='social-media'>
        <div class='social-media-wrap is-flex is-flex-direction-column'>
          {/* <div class='footer-logo'>
            <Link to='/' className='social-logo'>
              <i class='fas fa-ticket-alt' />
              MOVIEMATE
              <i class='fas fa-ticket-alt' />
            </Link>
          </div> */}
          <small class='website-rights'>MovieMate © 2022</small>
          <div class='social-icons mb-5'>
            <a
              class='social-icon-link Github'
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/"
            >
              <i class='fab fa-github' />
            </a>
            <a
              class='social-icon-link facebook'
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.com/"
            >
              <i class='fab fa-facebook-f' />
            </a>
            <a
              class='social-icon-link instagram'
              target="_blank"
              rel="noopener noreferrer"
              href="https://instagram.com/"
            >
              <i class='fab fa-instagram' />
            </a>
            <a
              class='social-icon-link twitter'
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/"
            >
              <i class='fab fa-twitter' />
            </a>
            <a
              class='social-icon-link linkedin'
              target="_blank"
              rel="noopener noreferrer"
              href="https://linkedin.com/"
              
            >
              <i class='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer2