import { useQuery } from '@apollo/client';
import React from 'react';
import { MY_REVIEWS } from '../utils/queries';

const UserReviews = () => {
  const myReviews = useQuery(MY_REVIEWS)
  const reviewData = myReviews.data?.myReviews || myReviews.data
  console.log(reviewData)
  return (
      <>
        <div className="columns p-4 has-background-white">
          <div className="column is-12">
            <section className="hero">
              <div className="hero-body">
                <div className="container is-flex is-flex-direction-row is-justify-content-space-between">
                  <div className="container">
                    <h1 id="greeting" className="title">
                      See Your Reviews Below!
                    </h1>
                  </div>
                </div>
              </div>

              <div className="">
                <h2 className="card-header-title">My Reviews</h2>
              </div>
              <br />
              {/* card section */}
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
        </div>
      </>
  );
};

export default UserReviews;