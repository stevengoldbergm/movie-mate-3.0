import React from 'react'
import { Link } from 'react-router-dom'
import '../../components/FriendList/style.css'
import './style.css'
import '../../components/Navbar2/NavBtn.css';
import { Button } from '../../components/Navbar2/NavBtn';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

function PartyInvites() {
    return (
      <>
        <div className="columns p-4 has-background-white">
          {/*  <div className="is-3 p-3 ">
         <aside className="menu is-hidden-mobile ">
        <p className="menu-label">
            Profile
        </p>
            <ul className="menu-list">
            <Link className="menu-list" to="/Reviews">
                Your Reviews
            </Link>
            <Link className="menu-list" to="/Profile">
                Your Activity
            </Link>
            <Link className="menu-list" to="/Profile">
                Your Friends
            </Link>
            <Link className="menu-list" to="/Profile">
                Your Invites
            </Link>
            </ul>
        </aside> 
            </div> */}

          <div className="row is-12">
            <section className="hero">
              <div className="hero-body">
                <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                  <div className="container">
                    <h1 id="greeting" className="title">
                      Create movie parties and invite others to watch!
                    </h1>
                  </div>
                </div>
                <br />
                {/* form template */}
                <div className="main-header">
                  <h2>Search for Movie Title:</h2>
                  <form>
                    <label>What movie do you want to watch with friends?</label>
                    <input type="text" required=""></input>
                  </form>
                  <button>Search</button>
                  <aside></aside>
                </div>

                <div className="">
                  <h2 className="card-header-title">Watch Party Requests</h2>
                </div>
                <br />
                {/* card section */}
                <div className="info-tiles">
                  <div className="tile has-text-centered">
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">
                          @placeholder wants to watch a movie with you!
                        </p>
                        <p className="subtitle">Do you want to accept?</p>
                        <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                          <Button
                            className="btn"
                            buttonStyle="btn--checkmark"
                            buttonSize="btn--yesfriends"
                          >
                            <i className="fas fa-solid fa-check" />
                          </Button>
                          <Button
                            className="btn"
                            buttonStyle="btn--xmark"
                            buttonSize="btn--nofriends"
                          >
                            ❌
                          </Button>
                        </div>
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">
                          @placeholder wants to watch a movie with you!
                        </p>
                        <p className="subtitle">Do you want to accept?</p>
                        <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                          <Button
                            className="btn"
                            buttonStyle="btn--checkmark"
                            buttonSize="btn--yesfriends"
                          >
                            <i className="fas fa-solid fa-check" />
                          </Button>
                          <Button
                            className="btn"
                            buttonStyle="btn--xmark"
                            buttonSize="btn--nofriends"
                          >
                            ❌
                          </Button>
                        </div>
                      </article>
                    </div>
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">
                          @placeholder wants to watch a movie with you!
                        </p>
                        <p className="subtitle">Do you want to accept?</p>
                        <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                          <Button
                            className="btn"
                            buttonStyle="btn--checkmark"
                            buttonSize="btn--yesfriends"
                          >
                            <i className="fas fa-solid fa-check" />
                          </Button>
                          <Button
                            className="btn"
                            buttonStyle="btn--xmark"
                            buttonSize="btn--nofriends"
                          >
                            ❌
                          </Button>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
}

export default PartyInvites