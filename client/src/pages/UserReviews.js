import { useQuery } from '@apollo/client';
import React from 'react';
import { MY_REVIEWS } from '../utils/queries';

const UserReviews = () => {
  const myReviews = useQuery(MY_REVIEWS);
  const reviewData = myReviews.data?.myReviews || myReviews.data;
  console.log(reviewData);
  return (
      <>
        <div className="columns is-multiline p-4 has-background-white">
          {/* Add the header */}
          <header className="column hero is-12">
              <div className="box hero-body has-text-centered pt-0 has-background-light p-2 is-roundeds">
                <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                  <div className="container">
                    <h1 id="greeting" className="title is-fullwidth has-text-centered has-text-dark has-text-weight-bold is-size-4 p-0">
                      Your MovieMate Reviews
                    </h1>
                  </div>
                </div>
              </div>
          </header>

          {/* Add the review cards */}
          <div className='column is-12 columns is-multiline m-0 is-justify-content-center'>
            {!reviewData.length 
              ? <article className="message is-dark card">
                  <div className="has-text-centered pt-3 px-3">
                    It doesn't look like you've reviewed any movies yet!
                  </div>
                  <div className="has-text-centered px-3">
                    Why don't you search for a movie you like, and let the world know your thoughts!
                  </div>

                  <br/>
                </article>
              : ( reviewData.map((review) => {
                  return (
                    <article className="message is-dark column is-12 card p-0" key={review._id}>
                      <div className="message-header">
                        <p>{review.movie_name}</p>
                        <p>Rating: {review.review_score} / 10</p>
                      </div>
                      <div className="message-body">
                        {review.review_text}
                      </div>
                      <hr/>
                      <div className='columns is-justify-content-space-around m-0  is-mobile'>
                        {/* <button className='button is-dark column columns is-3 m-0 is-mobile'>
                          <p>Edit</p>
                        </button> */}
                        <button 
                          className='button is-dark column columns is-3 m-0 is-mobile'
                        >
                            <p>Delete</p>
                        </button>
                      </div>
                      <br/>
                    </article>
                )}))
            }
          </div>



          {/* ---------------------Delete Below Here--------------------- */}

              {/* <div className="">
                <h2 className="card-header-title">My Reviews</h2>
              </div> */}

              {/* card section */}
              
              {/* <div className="info-tiles">
                <div className="tile has-text-centered">
                  {!reviewData 
                  ? 
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">No reviews found. . .</p>
                      </article>
                    </div> 
                  : (
                    reviewData.map((review) => {
                      return (
                        <div className={`tile is-parent`} key={review._id}>
                          <article className={`tile is-child box`} >
                            <p className="title"> {review.movie_name} Review</p>
                            <p className="subtitle">{review.review_score}/10</p>
                            <p className="subtitle">Your Review: {review.review_text}</p>
                            <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
                            </div>
                          </article>
                        </div>
                      )
                    })
                  )}
                </div>
              </div> */}

        </div>
        {/* <div className="columns p-4 has-background-white">
          <div className="column is-12">
            <section className="hero">
              <div className="hero-body has-text-centered pt-0">
                <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                  <div className="container">
                    <h1 id="greeting" className="title">
                      Reviews
                    </h1>
                  </div>
                </div>
              </div>

              <div className="">
                <h2 className="card-header-title">My Reviews</h2>
              </div>

              card section 
              
              <div className="info-tiles">
                <div className="tile has-text-centered">
                  {!reviewData 
                  ? 
                    <div className="tile is-parent">
                      <article className="tile is-child box">
                        <p className="title">No reviews found. . .</p>
                      </article>
                    </div> 
                  : (
                    reviewData.map((review) => {
                      return (
                        <div className={`tile is-parent`} key={review._id}>
                          <article className={`tile is-child box`} >
                            <p className="title"> {review.movie_name} Review</p>
                            <p className="subtitle">{review.review_score}/10</p>
                            <p className="subtitle">Your Review: {review.review_text}</p>
                            <div className="btn is-flex is-flex-direction-row is-justify-content-space-between">
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
        </div> */}
      </>
  );
};

export default UserReviews;