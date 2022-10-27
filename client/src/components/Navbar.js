// import React from 'react'

import React, { useState, useEffect } from 'react';
import { Button } from './navbarBtn.css';
import { Link } from 'react-router-dom';
// import './';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          {/* link to search bar homepage */}
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            MovieMate
            <i class='fas fa-ticket-alt' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          {/* when you click on the buger menu it shows the 'x' and when you click out of it, the 3 lines show up again */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              {/* link to Movie Searh page */}
              <Link to='/MovieSearch' className='nav-links' onClick={closeMobileMenu}>
                Movie Search
              </Link>
            </li>
            <li className='nav-item'>
              {/* link to profile page */}
              <Link
                to='/Profile'
                className='nav-links'
                onClick={closeMobileMenu}>
                Profile
              </Link>
            </li>
            <li className='nav-item'>
              {/* link to review page */}
              <Link
                to='/Reviews'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Reviews
              </Link>
            </li>
            <li>
              <Link
                to='/Freind-Requests'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Friend Requests
              </Link>
            </li>
            <li>
              <Link
                to='/Watch-party-invites'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Watch Party Invites
              </Link>
            </li>
            <li>
              <Link
                to='/Logout'
                className='nav-links-mobile'
                onClick={closeMobileMenu}
              >
                Logout
              </Link>
            </li>
            {/* log out button...unsure if we still need sign up and login button on navbar? */}
          </ul>
          {button && <Button buttonStyle='btn--outline'>Logout</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar