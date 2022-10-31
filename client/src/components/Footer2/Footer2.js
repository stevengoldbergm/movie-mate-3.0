import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'


function Footer2() {
  return (
    <footer className='footer-container pop'>
      <section className='social-media'>
        <div className='social-media-wrap is-flex is-flex-direction-column'>
          {/* <div className='footer-logo'>
            <Link to='/' className='social-logo'>
              <i className='fas fa-ticket-alt' />
              MOVIEMATE
              <i className='fas fa-ticket-alt' />
            </Link>
          </div> */}
          <small className='website-rights'>MovieMate © 2022</small>
          <div className='social-icons mb-5'>
            <a
              className='social-icon-link Github'
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/"
            >
              <i className='fab fa-github' />
            </a>
            <a
              className='social-icon-link facebook'
              target="_blank"
              rel="noopener noreferrer"
              href="https://facebook.com/"
            >
              <i className='fab fa-facebook-f' />
            </a>
            <a
              className='social-icon-link instagram'
              target="_blank"
              rel="noopener noreferrer"
              href="https://instagram.com/"
            >
              <i className='fab fa-instagram' />
            </a>
            <a
              className='social-icon-link twitter'
              target="_blank"
              rel="noopener noreferrer"
              href="https://twitter.com/"
            >
              <i className='fab fa-twitter' />
            </a>
            <a
              className='social-icon-link linkedin'
              target="_blank"
              rel="noopener noreferrer"
              href="https://linkedin.com/"
              
            >
              <i className='fab fa-linkedin' />
            </a>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer2