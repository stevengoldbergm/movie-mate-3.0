import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../components/FriendList/style.css'
import './style.css'
import '../../components/Navbar2/NavBtn.css';
import { Button } from '../../components/Navbar2/NavBtn';
import { useQuery } from '@apollo/client';
import { INVITED_WATCH_PARTIES, MY_PARTY_INVITES } from '../../utils/queries';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

function PartyInvites() {

  // Set state for Watch Party Invites and invited parties
  const [partyInviteState, setPartyInviteState] = useState([])
  const [invitedPartiesState, setInvitedPartiesState] = useState([])

  // Search for party invites and invited parties
  const partyInvites = useQuery(MY_PARTY_INVITES)
  const invitedParties = useQuery(INVITED_WATCH_PARTIES)
  console.log(invitedParties)

  useEffect(() => {
    if (partyInvites.data) {
      setPartyInviteState(partyInvites.data.myPartyInvites);
    }
  },[partyInvites.data])

  useEffect(() => {
    if (invitedParties.data) {
      setInvitedPartiesState(invitedParties.data.invitedWatchParties);
    }
  },[invitedParties.data])


  if (partyInvites.loading || invitedParties.loading) return 'Loading. . .'
  if (partyInvites.loading || invitedParties.loading) return `Error!`
  
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
                <div className="">
                  <h2 className="card-header-title">You Are a Participant in the Below Watch Parties</h2>
                </div>
                <br />
                {/* card section */}
                <div className="info-tiles">
                  <div className="tile has-text-centered">
                    {!invitedPartiesState
                    ?
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">You are not a participant in any Watch Parties</p>
                      </article>
                    </div> 
                  : (
                    invitedPartiesState.map((watchParty, index) => {
                      return (
                      <div className="tile is-parent" key={watchParty._id}>
                      <article className="tile is-child box">
                        <p className="title">
                        {watchParty.host}'s WatchParty
                        </p>
                        <p>Date: {watchParty.date}</p>
                        <p>Time: {watchParty.time}</p>
                        <p>Invited: 
                          <ul>
                            {watchParty.recipients.map((recipients) => {
                              return (
                                <li>{recipients.username}: {recipients.attending}</li>
                              )
                            })}
                          </ul>
                        </p>
                      </article>
                    </div>
                    )
                  })
                  
                  )}                    
                  </div>
                </div>
                <div className="">
                  <h2 className="card-header-title">The Below Invites are Pending Your Response</h2>
                </div>
                <br />
                
                {/* card section */}
                <div className="info-tiles">
                  <div className="tile has-text-centered">
                    {!partyInviteState
                    ?
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">No pending party invites. . .</p>
                      </article>
                    </div> 
                  : (
                    partyInviteState.map((partyInvite, index) => {
                      return (
                      <div className="tile is-parent" key={partyInvite._id}>
                      <article className="tile is-child box">
                        <p className="title">
                          {partyInvite.host} has invited you to a party on {partyInvite.date} at {partyInvite.time}
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
                    )
                  })
                  
                  )}                    
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