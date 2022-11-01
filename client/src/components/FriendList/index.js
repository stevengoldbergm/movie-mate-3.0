import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './style.css'
import {Button} from '../Navbar2/NavBtn'
import '../Navbar2/NavBtn.css'
import { MY_FRIEND_REQUESTS, QUERY_USERS } from '../../utils/queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { ADD_FRIEND, DENY_FRIEND, CREATE_FRIEND_REQUEST } from '../../utils/mutations'
import Auth from '../../utils/auth';


function FriendList() {
  // Issues:
    // Searching for a null value after searching for a bad value (no user) when adding a friend
    // results in the user's name popping up in the query results.
    
  // Set state for searchUser
  const [searchUser, setSearchUser] = useState('');

  // useLazyQuery to search for a specific friend!
  const [lazyUserSearch, lazySearchResults] = useLazyQuery(QUERY_USERS);

  // Import the query to search users
  const [createFriendRequest] = useMutation(CREATE_FRIEND_REQUEST);
  const [addFriend] = useMutation(ADD_FRIEND);
  const [denyFriend] = useMutation(DENY_FRIEND);

  // Set state for friend requests
  const [friendRequestState, setFriendRequestState] = useState([])

  // search for friend requests
  const friendRequests = useQuery(MY_FRIEND_REQUESTS);

  // Place before conditionals, but after initializing interior items
  useEffect(() => {
    if (friendRequests.data) {
      setFriendRequestState(friendRequests.data.myFriendRequests);
    }
  },[friendRequests.data])

  if (friendRequests.loading) return 'Loading. . .'
  if (friendRequests.error) return `Error! ${friendRequests.error.message}`

  const handleInputChange = (event) => {
    console.log(event.target.value)
    setSearchUser(event.target.value);
  }

  const handleFormSubmit = (event) => {
    // Prevent Default
    event.preventDefault();
    
    // kickback if there's no data
    console.log(event.target.value)
    if (event.target.value === '') {
      return;
    }

    // Check for friends
    try {
      lazyUserSearch({
      variables: { username: searchUser }}
      )
      if (!lazySearchResults.data) {
        console.log('Loading. . .')
      } else {
          console.log(lazySearchResults.data.users[0].username);
      }
    } catch (error) {
      console.log("Probably a bad username")
      console.log(error);
    }
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
      console.log(`Trying to create friend request for ${searchUser}`)
      const friendRequest = await createFriendRequest( { variables: { username: searchUser } } );
      console.log(friendRequest);
    } catch (error) {
      console.error(error);
    }
  }

  const handleAcceptFriend = (num) => {
    console.log('accept friend');

    // Remove request element from state array and update the state
    console.log(num);
    console.log(friendRequestState);
    let copyState = [...friendRequestState];
    copyState = copyState.filter((item, index) => num !== index)
    console.log(copyState);
    setFriendRequestState(copyState);

    // Add friend based on which button you click
    try {
      addFriend({variables: { username: friendRequestState[num].sender, requestId: friendRequestState[num]._id}})
      console.log('Friend Added!')
    } catch {
      console.log(addFriend.error)
    }
  }

  const handleDenyFriend = (num) => {
    console.log('deny friend')

    // Remove request element from state array and update the state
    console.log(num);
    console.log(friendRequestState);
    let copyState = [...friendRequestState];
    copyState = copyState.filter((item, index) => num !== index)
    console.log(copyState);
    setFriendRequestState(copyState);

    // Deny that loser your attention
    try {
      denyFriend({variables: { username: friendRequests.data.myFriendRequests[num].sender, requestId: friendRequests.data.myFriendRequests[num]._id}})
      console.log('Friend Denied!')
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
                {lazySearchResults.data?.users[0] !== undefined
                  ? <article className="tile is-child box">
                      <p className="title">They're here!</p>
                      <p className="subtitle">Do you want to add <strong>{lazySearchResults.data?.users[0].username}</strong> as a friend?</p>
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
                  {!friendRequestState 
                  ? 
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">No pending friend requests. . .</p>
                      </article>
                    </div> 
                  : (
                    friendRequestState.map((friendRequest, index) => {
                      return (
                        <div className={`tile is-parent`} key={friendRequest._id}>
                          <article className={`tile is-child box`}>
                            <p className="title">{friendRequest.sender} wants to add you as a friend!</p>
                            <p className="subtitle">Do you want to accept?</p>
                            <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                              <Button
                                type='click'
                                onClick={() => handleAcceptFriend(index)}
                                className="btn"
                                buttonStyle="btn--checkmark"
                                buttonSize="btn--yesfriends"
                              >
                                <i className="fas fa-solid fa-check" />
                              </Button>
                              <Button
                                type='click'
                                onClick={() => handleDenyFriend(index)}
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
            </section>
          </div>
        </div>
      </>
    );
}

export default FriendList