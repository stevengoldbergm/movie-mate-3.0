import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../../components/FriendList/style.css'
import './style.css'
import '../../components/Navbar2/NavBtn.css';
import { Button } from '../../components/Navbar2/NavBtn';
import { useMutation, useQuery } from '@apollo/client';
import { INVITED_WATCH_PARTIES, MY_PARTY_INVITES, MY_WATCHPARTIES } from '../../utils/queries';
import {ACCEPT_PARTY, DENY_PARTY, CREATE_WATCHPARTY, WATCHPARTY_INVITE} from '../../utils/mutations'
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

function PartyInvites() {

  // Set state for Watch Party Invites and invited parties
  const [partyInviteState, setPartyInviteState] = useState([])
  const [invitedPartiesState, setInvitedPartiesState] = useState([])
  const [hostPartyState, setHostParty] = useState("off")
  const [hostedPartiesState, setHostedPartiesState] = useState([])
  const [inviteFormUsername, setInviteFormUsername] = useState("")

  // Search for party invites and invited parties
  const partyInvites = useQuery(MY_PARTY_INVITES)
  const invitedParties = useQuery(INVITED_WATCH_PARTIES)
  const hostedParties = useQuery(MY_WATCHPARTIES)
  const [acceptParty] = useMutation(ACCEPT_PARTY)
  const [denyParty] = useMutation(DENY_PARTY)
  const [inviteFriend] = useMutation(WATCHPARTY_INVITE)
 
  // Mutation for creating a new watch party
  const [createWatchParty]  = useMutation(CREATE_WATCHPARTY)
  const [partyFormData, setPartyFormData] = useState({
    date: "",
    time: ""
  })
  
  // Mutations for watch party responses
  const handleAcceptParty = (num) => {
    let copyState= [...partyInviteState];
    // console.log(copyState)
    // console.log(num)
    // console.log(copyState[num].partyId)
    // console.log(copyState[num]._id)

    try {
      acceptParty({variables: {partyId: copyState[num].partyId, inviteId: copyState[num]._id}})
      console.log("Party invite accepted")
      copyState = copyState.filter((item,index) => num !== index)
      setPartyInviteState(copyState)
    } catch {
      console.error(acceptParty.error)
    }
  }

  const handleDenyParty = (num) => {
    let copyState = [...partyInviteState];
    console.log(copyState)
    console.log(num)
    console.log(copyState[num].partyId)
    console.log(copyState[num]._id)

    try {
      denyParty({variables: {partyId: copyState[num].partyId, inviteId: copyState[num]._id}})
      console.log("Party invite denied")
      copyState = copyState.filter((item,index) => num !== index)
      setPartyInviteState(copyState)
    } catch {
      console.error(denyParty.error)
    }
  }

  const handleInviteFriend = (num) => {
    let copyState = [...hostedPartiesState]
    console.log(copyState)
    console.log(num)
    try{ 
      console.log(inviteFormUsername)
      console.log(copyState[num]._id)
      inviteFriend({variables: {username: inviteFormUsername, partyId: copyState[num]._id}})
      setInviteFormUsername("")
    } catch {
      console.error(inviteFriend.error)
    }
  }

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

  useEffect(() => {
    if (hostedParties.data) {
      setHostedPartiesState(hostedParties.data.myWatchParties)
    }
  }, [hostedParties.data])

  const handleFormUpdate = (event) => {
    const { name, value } = event.target;
    console.log(event.target)
    setPartyFormData({...partyFormData, [name]: value});
    console.log(partyFormData);
  }

  const handleInviteUpdate = (event) => {
    console.log(event.target)
    const {value} = event.target;
    setInviteFormUsername(value)
  }
  
  const handleFormSubmit = async (event) => {
    // Don't you dare refresh that page
    event.preventDefault()
    const { date, time } = partyFormData;

    if(!date || !time ) {
      console.log("Please provide a time and date for your party")
      return;
    }

    try {
      const newParty = await createWatchParty({ variables: {date, time}})
      console.log('New Party:', newParty)

      setPartyFormData({
        date:"",
        time: ""
      })
    } catch (error) {
      console.error(error)
    }
  }

  if (partyInvites.loading || invitedParties.loading) return 'Loading. . .'
  if (partyInvites.loading || invitedParties.loading) return `Error!`
  
  return (
    <>
      <div className="columns p-4 has-background-white">
        <div className="row is-12">
          <section className="hero">
            <div className="hero-body">
              <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                <div className="container">
                  <h1 id="greeting" className="title">
                    Create movie parties and invite others to watch!
                  </h1>
                  {hostPartyState === "of" ? (
                    <Button
                      type="click"
                      className="btn"
                      buttonStyle="btn--checkmark"
                      buttonSize="btn--yesfriends"
                    >
                      Host a New WatchParty
                    </Button>
                  ) : (
                    // Placeholder for form to create party
                    <form className="box" id="submit-review">
                      <h1 className="py-2">Create a New Watch Party:</h1>
                      <div className="field">
                        <label className="label">Date:</label>
                        <input
                          className="textarea is-info"
                          name="date"
                          id="date-text"
                          placeholder="What day is your watch party?"
                          onChange={handleFormUpdate}
                          value={partyFormData.date}
                        />
                      </div>
                      <div className="field">
                        <label className="label">Time:</label>
                        <input
                          className="textarea is-info"
                          name="time"
                          id="time-text"
                          placeholder="When is your watch party?"
                          onChange={handleFormUpdate}
                          value={partyFormData.time}
                        />
                      </div>
                      <div className="field">
                        <button 
                          className="button is-info is-fullwidth"
                          onClick={handleFormSubmit}
                        >
                          Create Watch Party
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>
              <div className="">
                <h2 className="card-header-title">
                  You Are hosting the Below Watch Parties
                </h2>
              </div> 
              {!hostedPartiesState ? (
                <p> No hosted parties</p>
              ): (
                hostedPartiesState.map((hostedParty, index) =>{
                  return (
                    <div className = "tile is-parent" key={hostedParty._id}>
                      <article className='tile is-child box'>
                      <p className='title'>
                        You are hosting a watch party on {hostedParty.date} at {hostedParty.time}
                      </p>
                      <h2>Invite Friends</h2>
                      <div className="field">
                        <label className="label">Type Friend Below:</label>
                        <input
                          className="textarea is-info"
                          name="friend"
                          id="friend-text"
                          placeholder="Who do you want to invite?"
                          onChange={handleInviteUpdate}
                          value={inviteFormUsername}
                        />
                      </div>
                      <div className="field">
                        <button 
                          className="button is-info is-fullwidth"
                          onClick={() => handleInviteFriend(index)}
                        >
                          Invite {inviteFormUsername}
                        </button>
                      </div>

                      </article>
                    </div>
                  )
                })
              )}
              <br />
              <div className="">
                <h2 className="card-header-title">
                  You Are a Participant in the Below Watch Parties
                </h2>
              </div>
             
              {/* card section */}
              <div className="info-tiles">
                <div className="tile has-text-centered">
                  {!invitedPartiesState ? (
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">
                          You are not a participant in any Watch Parties
                        </p>
                      </article>
                    </div>
                  ) : (
                    invitedPartiesState.map((watchParty) => {
                      return (
                        <div className="tile is-parent" key={watchParty._id}>
                          <article className="tile is-child box">
                            <p className="title">
                              {watchParty.host}'s Watch Party
                            </p>
                            <p>Date: {watchParty.date}</p>
                            <p>Time: {watchParty.time}</p>
                            <p>Invited: </p>

                            <ul>
                              {watchParty.recipients.map((recipients) => {
                                return (
                                  <li>
                                    {recipients.username}:{" "}
                                    {recipients.attending}
                                  </li>
                                );
                              })}
                            </ul>
                          </article>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <div className="">
                <h2 className="card-header-title">
                  The Below Invites are Pending Your Response
                </h2>
              </div>
              <br />
              {/* card section */}
              <div className="info-tiles">
                <div className="tile has-text-centered">
                  {!partyInviteState ? (
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">No pending party invites. . .</p>
                      </article>
                    </div>
                  ) : (
                    partyInviteState.map((partyInvite, index) => {
                      return (
                        <div className="tile is-parent" key={partyInvite._id}>
                          <article className="tile is-child box">
                            <p className="title">
                              {partyInvite.host} has invited you to a party on{" "}
                              {partyInvite.date} at {partyInvite.time}
                            </p>
                            <p className="subtitle">Do you want to accept?</p>
                            <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                              <Button
                                type="click"
                                onClick={() => handleAcceptParty(index)}
                                className="btn"
                                buttonStyle="btn--checkmark"
                                buttonSize="btn--yesfriends"
                              >
                                <i className="fas fa-solid fa-check" />
                              </Button>
                              <Button
                                type="click"
                                onClick={() => handleDenyParty(index)}
                                className="btn"
                                buttonStyle="btn--xmark"
                                buttonSize="btn--nofriends"
                              >
                                ❌
                              </Button>
                            </div>
                          </article>
                        </div>
                      );
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
};

export default PartyInvites;