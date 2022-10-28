import React from 'react'
import { Link } from 'react-router-dom'
import './Footer.css'


function FooterNew() {
  return (
    <div className='footer-container'>
        <section class='social-media'>
        <div class='social-media-wrap'>
          <div class='footer-logo'>
            {/* <Link to='/' className='social-logo'>
              <i class='fas fa-ticket-alt' />
              MOVIEMATE
              <i class='fas fa-ticket-alt' />
            </Link> */}
          </div>
          <small class='website-rights'>MovieMate © 2022</small>
          <div class='social-icons'>
            <Link
              class='social-icon-link Github'>
              <i class='fab fa-github' />
            </Link>
            <Link
              class='social-icon-link facebook'>
              <i class='fab fa-facebook-f' />
            </Link>
            <Link
              class='social-icon-link instagram'>
              <i class='fab fa-instagram' />
            </Link>
            <Link
              class='social-icon-link twitter'>
              <i class='fab fa-twitter' />
            </Link>
            <Link
              class='social-icon-link twitter'>
              <i class='fab fa-linkedin' />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default FooterNew