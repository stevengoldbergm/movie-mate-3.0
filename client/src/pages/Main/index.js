import React from 'react';
import '../../App.css'
import { Button } from './NavBtn'
import './style.css';
import { Link } from 'react-router-dom'
import MovieVideo from './moviefilm.mp4'



const Main = () => {
  return (
    <div className='main-container'>
        <video src= {MovieVideo} autoPlay loop muted/>
        
        <h1>
        <i class='fas fa-ticket-alt fa-ticket-alt-main' />
          MOVIEMATE
        <i class='fas fa-ticket-alt fa-ticket-alt-main' />
        </h1>
        
        <p>Watch and review all your favorite movies alone or with friends!</p>
        <div className='main-btns'>
            <Button className='btn' buttonStyle='btn--outline-login' buttonSize='btn--large'>
                LOGIN
            </Button>
            <Button className='btn' buttonStyle='btn--info' buttonSize='btn--large'>
                SIGN UP
            </Button>
            
        </div>
    </div>
  )
}

export default Main;