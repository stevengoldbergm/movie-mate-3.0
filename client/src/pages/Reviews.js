import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../utils/mutations";
// import {} from '../utils/queries' // Need query to pull all reviews
// import {} from '../utils/mutations' // Need mutation to add new reviews
import Auth from '../utils/auth'


// Add OMDB search to Review page
// Add JSX to Review page

function Reviews() {
  //----- Pull in props from MovieData -----//
  const location = useLocation();
  console.log(location);
  const { searchResults } = location.state[0];
  const { imdbId } = location.state[1]
  console.log(searchResults, imdbId,);
  const [createReview, {error}] = useMutation(CREATE_REVIEW);
  //----- Set reviews state -----//
  const [reviews, setReviews] = useState([])

  //----- Check for existing reviews -----//
  // useEffect(() => {
    // const query = useQuery(Add query to search for all reviews where the imdbId = movie_id)
    // setReviews(query)
  // }, [])

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

    // Get user?
    // const { data } = await Auth.getProfile();
    // const userID = data._id;
    // console.log(data, userID);

    // Add submit query using reviewFormData{score, review, imdbId}
    // reformat variables as necessary
    try {
      console.log(score)
      console.log(review)
      console.log(movie_name)
      console.log(imdbId)
      const newReview = await createReview( { variables: {movieId: imdbId, reviewScore: score, reviewText: review, movieName: movie_name} } );
      console.log(newReview)
    } catch (error) {
      console.error(error);
    }
    console.log('Submitted Review!');
    console.log(reviewFormData);
  }


  return (
    <div>
      <div className="hero has-background-white">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-9">
                <section className="hero is-info welcome is-small is-roundeds">
                  <div className="hero-body">
                    
                    <div className="columns is-justify-content-space-between">
                      <div className="column is-flex-direction-column is-fullwidth">
                        <h1 className="title mb-1 movie-title is-centered">
                          {searchResults.Title}
                        </h1>
                        <p className="is-fullwidth has-background-info-light has-text-info has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Actors
                        </p>
                        <p className="movie-actors is-size-7 pl-3">
                          {searchResults.Actors}
                        </p>
                        <p className="is-fullwidth has-background-info-light has-text-info has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Directed By
                        </p>
                        <p className="movie-director is-size-7 pl-3">
                          {searchResults.Director}
                        </p>
                        <p className="is-fullwidth has-background-info-light has-text-info has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Written By
                        </p>
                        <p className="movie-writer is-size-7 pl-3">
                          {searchResults.Writer}
                        </p> 
                        <p className="is-fullwidth has-background-info-light has-text-info has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Rated
                        </p>
                        <p className="movie-rated is-size-7 pl-3">
                          {searchResults.Rated}
                        </p>
                        <p className="is-fullwidth has-background-info-light has-text-info has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Released
                        </p>
                        <p className="movie-released is-size-7 pl-3">
                          {searchResults.Released}
                        </p>
                        <p className="is-fullwidth has-background-info-light has-text-info has-text-weight-bold is-size-7 p-0 pl-3 my-2 is-roundeds">
                          Genre
                        </p>
                        <p className="movie-genre is-size-7 pl-3">
                          {searchResults.Genre}
                        </p>
                      </div>
                      <figure className="is-align-self-center has-background-info-dark is-roundeds">
                        <img className="movie-poster m-5 is-hidden-mobile" src={searchResults.Poster} alt='Movie Poster' />
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
                          <div className="select">
                            <select 
                              id="review-score"
                              name="score"
                              onChange={handleFormUpdate}
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
                          className="textarea is-info"
                          name="review"
                          id="review-text"
                          placeholder="What did you think about the movie?"
                          defaultValue={""}
                          onChange={handleFormUpdate}
                        />
                      </div>
                      <div className="field">
                        <button 
                          className="button is-info is-fullwidth"
                          onClick={handleFormSubmit}
                        >
                          Add Review
                        </button>
                      </div>
                    </form>
                    {/* Add generated review cards here */}
                    {reviews.length
                      ? (
                          reviews.map((review) => {
                            return (
                              <div key='review._id' className="card events-card"> 
                                <header className="card-header is-flex is-justify-content-space-between">
                                  <p className="card-header-title">
                                    username
                                  </p>
                                  <p className="pt-3 pr-3 has-text-weight-bold has-text-right">
                                    review_score out of 10
                                  </p>
                                </header>
                                <div className="card-table">
                                  <div className="content p-2">
                                    <table className="table is-fullwidth">
                                      <tr>
                                        <td width={5}>
                                          <i className="fa fa-bell-o"/>
                                        </td>
                                        <td>
                                          review_text
                                        </td>
                                      </tr>
                                    </table>
                                  </div>
                                </div>
                              </div>
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
