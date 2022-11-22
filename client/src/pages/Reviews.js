import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { CREATE_REVIEW } from "../utils/mutations";
import { QUERY_REVIEWS } from "../utils/queries";
import Auth from '../utils/auth'

function Reviews() {
  //----- Pull in props from MovieData -----//
  const location = useLocation();

  // console.log(location); // working
  const { searchResults } = location.state[0];
  const { imdbId } = location.state[1]

  // console.log(searchResults, imdbId,); // working
  const [createReview, { error }] = useMutation(CREATE_REVIEW);

  //----- Set reviews state -----//
  const [reviews, setReviews] = useState([])

  //----- Check for existing reviews -----//
    
    const {loading, data} = useQuery(QUERY_REVIEWS, 
      {variables: {movieId: imdbId}})
    // console.log(data)
    // Give the data time to populate as an object
    const reviewList = data?.reviews || [];
    // console.log(reviewList)
    
    // Set up lazy searches for the reviews.
    const [lazyReviewSearch, lazyReviewInfo] = useLazyQuery(QUERY_REVIEWS)
      
    // Set up function to use lazyQuery
    const searchReviews = async () => {
      try {
        console.log("Searching for Reviews")

        await lazyReviewSearch({ 
          variables: { movieId: imdbId },
          fetchPolicy: 'network-only'
        })
        // console.log(lazyReviewInfo.data?.reviews);
        setReviews(lazyReviewInfo.data?.reviews);
        // console.log(lazyReviewInfo);
      } catch (error) {
        console.error(error);
        console.log(lazyReviewInfo);
      }
    }

  // Populate the reviews state using the reviewList variable from above
  useEffect(() => {
    setReviews(reviewList);
  }, [reviews]);

  // console.log(reviewState);

  // Set initial form state
  const [reviewFormData, setReviewFormData] = useState({
    score: '',
    review: '',
    imdbId,
    movie_name: searchResults.Title
  });
  
  const handleFormUpdate = (event) => {
    const { name, value } = event.target;
    setReviewFormData({ ...reviewFormData, [name]: value });
    console.log(reviewFormData);
  }

  const handleFormSubmit = async (event) => {
    // Don't you dare refresh that page
    event.preventDefault()
    const { score, review, movie_name } = reviewFormData;

    // Don't submit an incomplete form!
    if (!score || score === 'Choose a score' || !review) {
      console.log("You need to fill out both fields!");
      return;
    }

    // Add submit query using reviewFormData{score, review, imdbId}
    // reformat variables as necessary
    try {
      // console.log(score, review, movie_name, imdbId)
      const newReview = await createReview( { variables: {movieId: imdbId, reviewScore: score, reviewText: review, movieName: movie_name} } );
      console.log('New Review:', newReview)

      // Reset form after review submit
      setReviewFormData({
        score: 'Choose a score',
        review: '',
        imdbId,
        movie_name: searchResults.Title
      });
      
      // Call lazyQuery to update the reviews on page
      searchReviews();

    } catch (error) {
      console.error(error);
    }
    // console.log('Submitted Review!');
    // console.log(reviewFormData);
  }


  return (
    <div>
      <div className="hero has-background-white">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-9">
                <section className="hero is-light welcome is-small is-roundeds">
                  <div className="hero-body">
                    <div className="columns is-multiline is-justify-content-space-between">
                      <div className="column is-12">
                        <h1 className="title mb-1 movie-title is-centered has-text-dark">
                          {searchResults.Title}
                        </h1>
                      </div>
                      <div className="column is-7 is-flex-direction-column is-fullwidth">
                        
                        <p className="has-background-dark has-text-white has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Actors
                        </p>
                        <p className="movie-actors is-size-7 pl-3">
                          {searchResults.Actors}
                        </p>
                        <p className="is-fullwidth has-background-dark has-text-white has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Directed By
                        </p>
                        <p className="movie-director is-size-7 pl-3">
                          {searchResults.Director}
                        </p>
                        <p className="is-fullwidth has-background-dark has-text-white has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Written By
                        </p>
                        <p className="movie-writer is-size-7 pl-3">
                          {searchResults.Writer}
                        </p> 
                        <p className="is-fullwidth has-background-dark has-text-white has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Rated
                        </p>
                        <p className="movie-rated is-size-7 pl-3">
                          {searchResults.Rated}
                        </p>
                        <p className="is-fullwidth has-background-dark has-text-white has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Released
                        </p>
                        <p className="movie-released is-size-7 pl-3">
                          {searchResults.Released}
                        </p>
                        <p className="is-fullwidth has-background-dark has-text-white has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Genre
                        </p>
                        <p className="movie-genre is-size-7 pl-3">
                          {searchResults.Genre}
                        </p>
                      </div>
                      <figure className="column columns is-justify-content-center pt-4 is-roundeds p-0 m-0">
                        <img className="box movie-poster p-0 m-0 is-hidden-mobile" src={searchResults.Poster} alt='Movie Poster' />
                      </figure>
                    </div>
                  </div>
                </section>
                <br />
                <section>
                  <div className="card-master is-6">
                    <form className="box" id="submit-review">
                      <h1 className="py-2">Add a Review:</h1>
                      <div className="field">
                        <label className="label">Score (1-10):</label>
                        <div className="control">
                          <div className="select is-dark">
                            <select 
                              id="review-score"
                              name="score"
                              onChange={handleFormUpdate}
                              value={reviewFormData.score}
                            >
                              <option>Choose a score</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                              <option>6</option>
                              <option>7</option>
                              <option>8</option>
                              <option>9</option>
                              <option>10</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Review:</label>
                        <textarea
                          className="textarea is-dark"
                          name="review"
                          id="review-text"
                          placeholder="What did you think about the movie?"
                          onChange={handleFormUpdate}
                          value={reviewFormData.review}
                        />
                      </div>
                      <div className="field">
                        <button 
                          className="button is-dark is-fullwidth"
                          onClick={handleFormSubmit}
                        >
                          Add Review
                        </button>
                      </div>
                    </form>
                    {/* Add generated review cards here */}
                    {reviews
                      ? (
                          reviews.map((review) => {
                            return (
                              <>
                              <div key= {review._id} className="card events-card"> 
                                <header className="card-header is-flex is-justify-content-space-between">
                                  <p className="card-header-title">
                                    {review.movie_name} review by {review.user_name}
                                  </p>
                                  <p className="pt-3 pr-3 has-text-weight-bold has-text-right">
                                    {review.review_score} out of 10
                                  </p>
                                </header>
                                <div className="card-table">
                                  <div className="content p-2">
                                    <table className="table is-fullwidth">
                                      <tbody>
                                        <tr>
                                          <td width={5}>
                                            <i className="fa fa-bell-o"/>
                                          </td>
                                          <td>
                                            {review.review_text}
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                              </div>
                              <br />
                              </>
                            )}
                          )
                        )
                      : null
                    }
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
