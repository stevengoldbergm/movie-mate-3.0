import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './style.css'
import {Button} from '../Navbar2/NavBtn'
import '../Navbar2/NavBtn.css'
import { MY_FRIEND_REQUESTS, QUERY_USERS } from '../../utils/queries'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { ADD_FRIEND, DENY_FRIEND, CREATE_FRIEND_REQUEST } from '../../utils/mutations'
import { ME } from '../../utils/queries'
import Auth from '../../utils/auth';


function FriendList() {
  // test find() to eventually lock out duplicate friend requests.
    // const arrayTest = [1,2,3,4,5]
    // const found = arrayTest.find(number => number === 1)
    // console.log(found)

  // Get out of here if you aren't logged in!
  const navigate = useNavigate()
  console.log("Logged in? ", Auth.loggedIn())
    if (!Auth.loggedIn()) {
      navigate("/login");
    };

  // Pull username and ID from profile
  const { username: user, _id: userId } = Auth.getProfile().data;
  console.log(Auth.getProfile());
  console.log(user, userId);

  // ----- Run queries to populate friends list ----- //
  
  // Pull query to get friends list
  // Convert friends list to friendslist.length to derive the value
  const meQuery = useQuery(ME);
  const meData = meQuery.data?.me.friends || meQuery.data;
  const meFriends = meData.map(friend => friend.username);
  console.log(meData);
  console.log(meFriends);

  // Set state for showAlert and alertError
  const [showAlert, setShowAlert] = useState(false);
  const [alertError, setAlertError] = useState('');

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
    
    // kickback if there's no data or if you search your own name
    console.log(searchUser)
    if (!searchUser || user === searchUser) {
      setAlertError('Invalid search!');
      setShowAlert(true);
      return;
    }

    // Check to see if searchUser is in your friend list
    const arrayTest = meFriends;
    const found = arrayTest.find(friend => friend === searchUser);
    console.log(found);
    // If a match is found, get out of here!
    if (found) {
      console.log('searchUser found in friends list');
      setAlertError('That user is already your friend!');
      setShowAlert(true);
      return;
    }

    // Check for friends
    try {
      lazyUserSearch({
        variables: { username: searchUser }
      }
      ).then(({ data: lazyData }) => {
        // So apparently Apollo only plays nice with .then?
        console.log(lazyData.users)

        if(!lazyData.users.length) {
          // Show the user an error!
          console.log ("This user doesn't exist.");
          setAlertError('Bad username (Check spelling and try again!)');
          setShowAlert(true);
        } else {
          // Make sure you remove displayed errors if the user is too lazy to click the X
          setShowAlert(false);
        }
        
      })

    } catch (error) {
      console.log("Flag bad username");
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
    } catch (error) {
      console.log(error)
    }
  }

  const handleShowAlert = () => {
    setShowAlert(!showAlert);
  }

    return (
      <>
        <div className="columns p-4 has-background-white">
          <div className="column is-12">
            <section className="hero columns">
              <div className="hero-body column is-12">
                <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                  <div className="container">
                    <h1 id="greeting" className="title is-size-4-mobile">
                      Find and add friends here!
                    </h1>
                  </div>
                </div>
              </div>
              {/* Add in container here for everything below */}
              <div className='container columns column is-multiline is-12'>
                <div className='columns column is-9 is-multiline is-mobile'>
                {/* form template */}
                  <div className="main-header columns is-multiline column is-12 m-0">
                    <h2 className='column is-12 mb-4'>Search for Friends</h2>

                      {/* Add dynamic showAlert here */}
                      { showAlert && 
                        <div className="column is-12 is-roundeds is-flex is-justify-content-space-between is-align-items-center header has-background-danger py-1 px-3">
                          <p className='has-text-white'>{alertError}</p>
                          <button 
                            className="delete has-background-danger" 
                            aria-label="delete"
                            onClick={handleShowAlert}
                          />
                        </div>
                      }
                    <form 
                      type="submit"
                      onSubmit={handleFormSubmit}
                      className="column is-12"
                    >
                      <label className='mt-4'>Search for username:</label>

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
                      className="ml-3 button is-small"
                    >
                      Search
                    </button>
                    <br />
                    <br />
                    {lazySearchResults.data?.users[0]
                      ? <article className="column is-12 tile is-child box">
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

                  <div className="column is-12">
                    <h2 className="card-header-title">Friend Requests</h2>
                  </div>
                  <br />
                  {/* card section */}
                  <div className="column is-12 info-tiles p-0">
                    <div className="tile has-text-centered">
                      {!friendRequestState.length 
                      ? 
                        <div className="tile is-parent">
                          <article className="tile is-child box">
                            <p className="title">No pending friend requests</p>
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
                </div>
              <div className='box columns is-multiline is-mobile column is-3 ml-1 mt-5 p-1'>
                <aside className='column is-12 p-0'>
                  <table className="card p-0 m-0 table is-fullwidth is-striped">
                    <tbody id="table-body p-0 m-0">
                      <tr>
                        <td className='p-1 has-text-weight-bold'>Friends</td>
                      </tr>
                      {meFriends?.length && 
                        meFriends.map((friend, index) => {
                          console.log(friend);
                          return (
                            <tr key={index}>
                              <td>{friend}</td>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </aside>
              </div>
            </div>
              
            </section>
          </div>
        </div>
      </>
    );
}

export default FriendList