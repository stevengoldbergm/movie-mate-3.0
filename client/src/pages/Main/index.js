import React from 'react';
import '../../App.css'
import { Button } from './NavBtn'
import './style.css';
import { Link } from 'react-router-dom'
import MovieVideo from './moviefilm.mp4'
import { useNavigate } from 'react-router-dom';
import Auth from '../../utils/auth';




const Main = () => {
  // const handleButtonClick = (event) => {
  //   event.preventdefault();

  // }


  return (
    <div className='main-container'>
        <video src= {MovieVideo} autoPlay loop muted/>
        
        <h1 className='pop'>
        <i className='fas fa-ticket-alt fa-ticket-alt-main is-size-1-touch is-hidden-mobile' />
          MOVIEMATE
        <i className='fas fa-ticket-alt fa-ticket-alt-main is-size-1-touch is-hidden-mobile' />
        </h1>
        
        <p className='has-text-centered is-size-5-touch pop'>Watch and review all your favorite movies alone or with friends!</p>
        {!Auth.loggedIn()
        ? 
        <div className='main-btns pop'>
          <Link to="/login">          
            <Button 
              className='btn' 
              buttonStyle='btn--outline-login' 
              buttonSize='btn--large'
              >
              LOGIN
            </Button>
          </Link>
          <Link to="/sign-up">
            <Button 
              className='btn' 
              buttonStyle='btn--info' 
              buttonSize='btn--large'
            >
              SIGN UP
            </Button>
          </Link>
        </div>
        :
          <></>
        }
        
    </div>
  )
}

export default Main;