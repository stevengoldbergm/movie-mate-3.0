import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from './NavBtn';
import './Navbarstyle.css'

function Navbar() {
    // updates useState to what is assigned
    const [click, setClick] = useState(false);
    // basically it reverses the above funtion (whenever its false its true vise versa)
    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

    // updates useState
    const [button, setButton] = useState(true);
    // makes button responsive and only shows up after a certain screen size (less than or equal to 960px)
    const showButton = () => {
        if(window.innerWidth <= 960) {
            setButton(false)
        } else {
            setButton(true)
        }
    };

    // renders logout button once and doesnt show it again
    useEffect(() => {
        showButton()
    }, []);

    window.addEventListener('resize', showButton);

    return (
    <>
        <nav className='navbar'>
        <div className='navbar-container'>
          {/* link to search bar homepage */}
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            <i class='fas fa-ticket-alt' />
            MovieMate
            <i class='fas fa-ticket-alt' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
            {/* when you click on the buger menu it shows the 'x' and when you click out of it, the 3 lines show up again */}
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
          {/* when you click on the navbar it disappears */}
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>

            <li className='nav-item'>
                {/* When any link is clicked it removes the navbar*/}
            <Link to='/Movie-Search' className='nav-links' onClick={closeMobileMenu}>
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
                onClick={closeMobileMenu}>
                Reviews
            </Link>
            </li>

            <li>
            <Link
                to='/Friend-Requests'
                className='nav-links'
                onClick={closeMobileMenu}>
                Friend Requests
            </Link>
            </li>

            <li>
            <Link
                to='/Watch-party-invites'
                className='nav-links'
                onClick={closeMobileMenu}>
                Watch Party Invites
            </Link>
            </li>

            <li>
            <Link
                to='/Logout'
                className='nav-links-mobile'
                onClick={closeMobileMenu}>
                Logout
            </Link>
            </li>
            {/* log out button...unsure if we still need sign up and login button on navbar? */}
        </ul>
        {button && 
        <Button buttonStyle='btn--outline'>
            Logout
        </Button>}
        </div>
        </nav>
    </>
    )
}

export default Navbar