import React from 'react'
import avatar from "./imgs/placeholder_profile.jpeg"
import Auth from '../../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { MY_REVIEWS, ME } from '../../utils/queries';


const Dashboard = () => {
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

  // ----- Run queries for fun user metrics ----- //
  
  // Pull reviews and use reviews.length to count the reviews this user has made
  const myReviews = useQuery(MY_REVIEWS);
  const reviewData = myReviews.data?.myReviews || myReviews.data;
  console.log(reviewData?.length);


  // Movie count isn't likely to be implemented, but it is a similarly simple feature
    // Add new data object for wishlist: empty array
    // Add button to users to add movies to their wishlist on the movie data page
    // Query user wishlist

  // Pull query to get friends list
    // Convert friends list to friendslist.length to derive the value
    const meQuery = useQuery(ME);
    const meData = meQuery.data?.me.friends || meQuery.data;
    const meFriends = meData?.length;
    console.log(meFriends);

  return (
    <>
      <section className="hero is-roundeds card is-dark is-small">
        <div className="hero-body">
          <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
            <div className="container is-flex is-flex-direction-column">
              <h1 id="greeting" className="title">
                Hello, {user}!
              </h1>
              <h2 className="is-size-4">Welcome to your profile!</h2>
            </div>
            <figure className="image is-128x128">
              <img
                className="is-rounded"
                src={avatar}
                alt="Profile Avatar"
              />
            </figure>
          </div>
        </div>
      </section>
      <br />
      <section className="info-tiles">
        <div className="tile has-text-centered">
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Review Count:</p>
              <p className="subtitle">{reviewData?.length}</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Movie Count:</p>
              <p className="subtitle">Coming Soon!</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child box">
              <p className="title">Movie Mates:</p>
              <p className="subtitle">{meFriends}</p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}

export default Dashboard