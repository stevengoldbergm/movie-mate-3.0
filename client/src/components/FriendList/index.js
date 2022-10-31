import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import {Button} from '../Navbar2/NavBtn'
import '../Navbar2/NavBtn.css'
import { MY_FRIEND_REQUESTS, QUERY_USERS } from '../../utils/queries'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_FRIEND, DENY_FRIEND, CREATE_FRIEND_REQUEST } from '../../utils/mutations'
import Auth from '../../utils/auth';


function FriendList() {
  // Issues:
    // Cannot reload state after adding or removing friend
    // UseEffect, UseContext, or other REACT function may help, 
    // but may require useLazyQuery or other method we have yet to utilize.

    
  // Set state for searchUser
  const [searchUser, setSearchUser] = useState('');
  const [searchedUser, setSearchedUser] = useState('');

  // Set State for is-hidden
  // const [isHidden, setIsHidden] = useState(false)

  // Import the query to search users
  // const [users, { error } ] = useQuery(QUERY_USERS);
  const [createFriendRequest] = useMutation(CREATE_FRIEND_REQUEST);
  const [addFriend] = useMutation(ADD_FRIEND);
  const [denyFriend] = useMutation(DENY_FRIEND);
  // const [denyFriend, { error }] = useMutation(DENY_FRIEND);


  // search for friend requests
  const friendRequests = useQuery(MY_FRIEND_REQUESTS);
  const friendRequestData = friendRequests.data?.myFriendRequests || friendRequests.data ;
  console.log(friendRequestData);

  // uselazyquery? Look it up
  const { loading, data } = useQuery(QUERY_USERS, {
    variables: { username: searchUser }});

  const UserTarget = data?.users[0] || {};

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setSearchUser(event.target.value);
  }

  const handleFormSubmit = (event) => {
    // NOTES:
      // Sometimes search doesn't render on first try
      // Bad searches immediately break site

    event.preventDefault();
    // console.log(event);
    console.log(searchUser);
    setSearchUser('');
    console.log(data);
    // console.log(data.users);

    // bad search breaks the site
    // if (data === undefined || data.users === []) {
    //   return;
    // }

    if (loading) {
      console.log(loading);
    } else {
      console.log(data.users[0].username);
      const targetValue = data.users[0].username
      setSearchedUser(targetValue);
      console.log(searchedUser); // Shows null, but react devtools finds the value
    }
    console.log(`searchedUser ${UserTarget}`); // Removing this breaks everything?
  }

  const handleFriendRequest = async (event) => {
    event.preventDefault();
    console.log('Friend Request Start')

    const token = Auth.loggedIn() ? Auth.getToken() : null;
    console.log('Token Check Done')


    if (!token) {
      console.log('No Token');
      return false;
    }

    try {
      console.log(`Trying to create friend request for ${searchedUser}`)
      const friendRequest = await createFriendRequest( { variables: { username: searchedUser } } );
      console.log(friendRequest);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAcceptFriend = () => {
    console.log('accept friend')

    try {
      addFriend({variables: { username: friendRequestData[0].sender, requestId: friendRequestData[0]._id}})
      console.log('Friend Added!')
      // setIsHidden(true);
    } catch {
      console.log(addFriend.error)
    }
  }
  const handleDenyFriend = () => {
    console.log('deny friend')

    try {
      denyFriend({variables: { username: friendRequestData[0].sender, requestId: friendRequestData[0]._id}})
      console.log('Friend Denied!')
      // setIsHidden(true);
      this.forceUpdate();
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <>
        <div className="columns p-4 has-background-white">
          <div className="column is-12">
            <section className="hero">
              <div className="hero-body">
                <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                  <div className="container">
                    <h1 id="greeting" className="title">
                      Find and add friends here!
                    </h1>
                  </div>
                </div>
              </div>
              {/* form template */}
              <div className="main-header">
                <h2>Search for Friends</h2>
                <form 
                  type="submit"
                  onSubmit={handleFormSubmit}
                >
                  <label>Search for username:</label>
                  <input 
                    name="searchUser"
                    value={searchUser}
                    onChange={handleInputChange}
                    type="text" 
                    id='searchUser'
                    placeholder="Enter friend's username"
                    autoComplete='off'
                  />
                </form>
                <button
                  type='submit'
                  onClick={handleFormSubmit}
                >
                  Search
                </button>
                {/* <aside></aside> */}
                {searchedUser
                  ? <article className="tile is-child box">
                      <p className="title">They're here!</p>
                      <p className="subtitle">Do you want to add <strong>{searchedUser}</strong> as a friend?</p>
                      <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                        <Button
                          type='click'
                          onClick={handleFriendRequest}
                          className="btn"
                          buttonStyle="btn--checkmark"
                          buttonSize="btn--yesfriends"
                        >
                          Add user to Friends List <i className="fas fa-solid fa-check" />
                          
                        </Button>
                      </div>
                    </article>
                  : null
                }
              </div>

              <div className="">
                <h2 className="card-header-title">Friend Requests</h2>
              </div>
              <br />
              {/* card section */}
              <div className="info-tiles">
                <div className="tile has-text-centered">
                  {!friendRequestData 
                  ? 
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">No pending friend requests. . .</p>
                      </article>
                    </div> 
                  : (
                    friendRequestData.map((friendRequest) => {
                      return (
                        <div className={`tile is-parent`} key={friendRequest._id}>
                          <article className={`tile is-child box`}>
                            <p className="title">{friendRequest.sender} wants to add you as a friend!</p>
                            <p className="subtitle">Do you want to accept?</p>
                            <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                              <Button
                                type='click'
                                onClick={handleAcceptFriend}
                                className="btn"
                                buttonStyle="btn--checkmark"
                                buttonSize="btn--yesfriends"
                              >
                                <i className="fas fa-solid fa-check" />
                              </Button>
                              <Button
                                type='click'
                                onClick={handleDenyFriend}
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

                  {/* <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">@placeholder wants to add you!</p>
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
                  </div> */}

                  {/* <div className="tile is-parent">
                    <article className="tile is-child box">
                      <p className="title">@placeholder wants to add you!</p>
                      <p className="subtitle">Do you want to accept?</p>
                      <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                        <Button
                          className="btn"
                          buttonStyle="btn--checkmark"
                          buttonSize="btn--yesfriends"
                        >
                          <i className=" fas fa-solid fa-check" />
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
                  </div> */}
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
}

export default FriendList