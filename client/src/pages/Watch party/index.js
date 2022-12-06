import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../../components/FriendList/style.css";
import "./style.css";
import "../../components/Navbar2/NavBtn.css";
import { Button } from "../../components/Navbar2/NavBtn";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {
  INVITED_WATCH_PARTIES,
  MY_PARTY_INVITES,
  MY_WATCHPARTIES,
} from "../../utils/queries";
import {
  ACCEPT_PARTY,
  DENY_PARTY,
  CREATE_WATCHPARTY,
  WATCHPARTY_INVITE,
  SEND_INVITE,
} from "../../utils/mutations";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { bulmaCalendar } from "bulma-calendar/dist/js/bulma-calendar.min.js";
import { options } from "bulma-calendar/dist/css/bulma-calendar.min.css";
function PartyInvites() {
  // Set state for Watch Party Invites and invited parties
  const [partyInviteState, setPartyInviteState] = useState(false);
  const [invitedPartiesState, setInvitedPartiesState] = useState(false);
  const [hostPartyState, setHostParty] = useState(false);
  const [hostedPartiesState, setHostedPartiesState] = useState(false);
  const [inviteFormUsername, setInviteFormUsername] = useState("");

  // Search for party invites and invited parties
  const partyInvites = useQuery(MY_PARTY_INVITES);
  const invitedParties = useQuery(INVITED_WATCH_PARTIES);
  const hostedParties = useQuery(MY_WATCHPARTIES);
  const [acceptParty] = useMutation(ACCEPT_PARTY);
  const [denyParty] = useMutation(DENY_PARTY);
  const [inviteFriend] = useMutation(WATCHPARTY_INVITE);
  const [sendInvite] = useMutation(SEND_INVITE);
  const [lazyPartiesSearch, lazyPartiesResults] = useLazyQuery(
    INVITED_WATCH_PARTIES,
    {
      fetchPolicy: "network-only",
    }
  );
  const [lazyHostedSearch, lazyHostedResults] = useLazyQuery(MY_WATCHPARTIES, {
    fetchPolicy: "network-only",
  });

  // Mutation for creating a new watch party
  const [createWatchParty] = useMutation(CREATE_WATCHPARTY);
  const [partyFormData, setPartyFormData] = useState({
    date: "",
    time: "",
  });

  // Mutations for watch party responses
  const handleAcceptParty = (num) => {
    let copyState = [...partyInviteState];
    // console.log(copyState)
    // console.log(num)
    // console.log(copyState[num].partyId)
    // console.log(copyState[num]._id)

    try {
      acceptParty({
        variables: {
          partyId: copyState[num].partyId,
          inviteId: copyState[num]._id,
        },
      });
      console.log("Party invite accepted");
      copyState = copyState.filter((item, index) => num !== index);
      setPartyInviteState(copyState);
      lazyPartiesSearch().then(({ data: lazyData }) => {
        console.log(lazyData.invitedWatchParties);
        setInvitedPartiesState(lazyData.invitedWatchParties);
      });
    } catch {
      console.error(acceptParty.error);
    }
  };

  const handleDenyParty = (num) => {
    let copyState = [...partyInviteState];
    console.log(copyState);
    console.log(num);
    console.log(copyState[num].partyId);
    console.log(copyState[num]._id);

    try {
      denyParty({
        variables: {
          partyId: copyState[num].partyId,
          inviteId: copyState[num]._id,
        },
      });
      console.log("Party invite denied");
      copyState = copyState.filter((item, index) => num !== index);
      setPartyInviteState(copyState);
      lazyPartiesSearch().then(({ data: lazyData }) => {
        console.log(lazyData.invitedWatchParties);
        setInvitedPartiesState(lazyData.invitedWatchParties);
      });
    } catch {
      console.error(denyParty.error);
    }
  };

  const handleInviteFriend = (num) => {
    let copyState = [...hostedPartiesState];
    console.log(copyState);
    console.log(num);
    try {
      console.log(inviteFormUsername);
      console.log(copyState[num]._id);
      inviteFriend({
        variables: {
          username: inviteFormUsername,
          partyId: copyState[num]._id,
        },
      });
      setInviteFormUsername("");
      alert(`${inviteFormUsername} has been invited`);
      sendInvite({
        variables: {
          username: inviteFormUsername,
          partyId: copyState[num]._id,
          date: copyState[num].date,
          time: copyState[num].time,
        },
      });
    } catch {
      console.error(inviteFriend.error);
    }
  };

  useEffect(() => {
    if (partyInvites.data) {
      setPartyInviteState(partyInvites.data.myPartyInvites);
    }
  }, [partyInvites.data]);

  useEffect(() => {
    if (invitedParties.data) {
      setInvitedPartiesState(invitedParties.data.invitedWatchParties);
    }
  }, [invitedParties.data]);

  useEffect(() => {
    if (hostedParties.data) {
      setHostedPartiesState(hostedParties.data.myWatchParties);
    }
  }, [hostedParties.data]);

  const handleFormUpdate = (event) => {
    const { name, value } = event.target;
    console.log(event.target);
    setPartyFormData({ ...partyFormData, [name]: value });
    console.log(partyFormData);
  };

  const handleInviteUpdate = (event) => {
    console.log(event.target);
    const { value } = event.target;
    setInviteFormUsername(value);
  };

  const handleFormSubmit = async (event) => {
    // Don't you dare refresh that page
    event.preventDefault();
    const { date, time } = partyFormData;

    if (!date || !time) {
      console.log("Please provide a time and date for your party");
      return;
    }

    try {
      const newParty = await createWatchParty({ variables: { date, time } });
      console.log("New Party:", newParty);

      setPartyFormData({
        date: "",
        time: "",
      });
      setHostParty(false);
      lazyHostedSearch().then(({ data: lazyData }) => {
        console.log(lazyData.myWatchParties);
        setHostedPartiesState(lazyData.myWatchParties);
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (partyInvites.loading || invitedParties.loading) return "Loading. . .";
  if (partyInvites.loading || invitedParties.loading) return `Error!`;

  //   // Calendar Initialization
  //   var calendars = bulmaCalendar.attach('[type="date"]', options);

  // // Loop on each calendar initialized
  // for(var i = 0; i < calendars.length; i++) {
  // 	// Add listener to select event
  // 	calendars[i].on('select', date => {
  // 		console.log(date);
  // 	});
  // }

  // var element = document.getElementById('date-text');

  // if (element) {
  // 	// bulmaCalendar instance is available as element.bulmaCalendar
  // 	element.bulmaCalendar.on('select', function(datepicker) {
  // 		console.log(datepicker.data.value());
  // 	});
  // }

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
                  {!hostPartyState ? (
                    <button
                      type="click"
                      className="button is-dark column columns is-4 m-0 is-mobile"
                      buttonStyle="btn--checkmark"
                      buttonSize="btn--yesfriends"
                      onClick={() => setHostParty(true)}
                    >
                      Host a New WatchParty
                    </button>
                  ) : (
                    // Placeholder for form to create party
                    <div>
                      <button
                        type="click"
                        className="button is-dark column columns is-4 m-0 is-mobile"
                        buttonStyle="btn--checkmark"
                        buttonSize="btn--yesfriends"
                        onClick={() => setHostParty(false)}
                      >
                        Hide WatchParty form
                      </button>
                      <br />
                      <form
                        className="message is-dark column is-12 card p-0"
                        id="submit-review"
                      >
                        <h1 className="py-2 message-header">
                          Create a New Watch Party:
                        </h1>
                        <div className="field column is-half">
                            <label className="label pl-2 pt-3">Date:</label>
                            <input
                              className="input is-small is-info"
                              name="date"
                              id="date-text"
                              placeholder="What day is your watch party?"
                              onChange={handleFormUpdate}
                              value={partyFormData.date}
                            />
                        </div>
                        <div className="field column is-half">
                          <label className="label pl-2 pt-3">Time:</label>
                          <input
                            className="input is-small is-info"
                            name="time"
                            id="time-text"
                            placeholder="When is your watch party?"
                            onChange={handleFormUpdate}
                            value={partyFormData.time}
                          />
                        </div>
                        <div className="field">
                          <button
                            className="button is-dark column columns m-0 is-mobile is-fullwidth"
                            onClick={handleFormSubmit}
                          >
                            Create Watch Party
                          </button>
                        </div>
                      </form>
                    </div>
                  )}
                </div>
              </div>
              <div className="">
                <h1 className="title py-3">
                  You Are hosting the Below Watch Parties
                </h1>
              </div>
              {!hostedPartiesState ? (
                <p> No hosted parties</p>
              ) : (
                hostedPartiesState.map((hostedParty, index) => {
                  return (
                    <article
                      className="message is-dark column is-12 card p-0"
                      key={hostedParty._id}
                    >
                      <div className="message-header">
                        You are hosting a watch party on {hostedParty.date} at{" "}
                        {hostedParty.time}
                      </div>
                      <div className="field">
                        <label className="label pl-2 pt-3">
                          Type A Friends Username Below:
                        </label>
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
                          className="button is-dark column columns m-0 is-mobile is-fullwidth"
                          onClick={() => handleInviteFriend(index)}
                        >
                          Invite {inviteFormUsername}
                        </button>
                      </div>
                    </article>
                  );
                })
              )}
              <br />
              <div>
                <h1 className="title py-3">
                  You Were Invited to the Below Watch Parties
                </h1>
              </div>

              {/* card section */}
              <div className="column is-12 columns is-multiline m-0 is-justify-content-center">
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
                      <article
                        className="message is-dark column is-12 card p-0"
                        key={watchParty._id}
                      >
                        <div className="message-header">
                          <p>{watchParty.host}'s Watch Party</p>
                          <p>{watchParty.date}</p>
                          <p>{watchParty.time}</p>
                        </div>
                        <div className="message-body">
                          <ul className="has-text-centered">
                            {watchParty.recipients.map((recipients) => {
                              return (
                                <li key={watchParty.recipients._id}>
                                  {recipients.username}: {recipients.attending}
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </article>
                    );
                  })
                )}
              </div>
              <div className="">
                <h1 className="title py-3">
                  The Below Invites are Pending Your Response
                </h1>
              </div>
              <br />
              {/* card section */}
              <div className="info-tiles">
                <div className="tile has-text-centered">
                  {partyInviteState == false ? (
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">No pending party invites</p>
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
}

export default PartyInvites;
