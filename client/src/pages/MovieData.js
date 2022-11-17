import React, { useEffect, useState } from "react";
import { searchMovie } from "../utils/API";
import { useNavigate } from 'react-router-dom';
import Auth from '../utils/auth'
import { Link } from "react-router-dom";

// const testMovie = "tt0103064";

const MovieData = () => {
 
  // Get out of here if you aren't logged in!
  const navigate = useNavigate()
  console.log("Logged in? ", Auth.loggedIn())
    if (!Auth.loggedIn()) {
      navigate("/login");
    };
  
  // Set the movie data state
  const [movieStuff, setMovieStuff] = useState({});

  // Pull imdbId from URL
  const url = window.location.pathname
  const imdbId = url.substring(url.lastIndexOf('/') + 1);

  // Search OMDb/YouTube with imdbId ONCE (It's running twice. . .)
  useEffect(() => {
    handleSearch();
  }, [])

  const handleSearch = async () => {
    try {
      const data = await searchMovie(imdbId);
      setMovieStuff(data);
      return;
    } catch (err) {
      console.log("error:", err);
    }
  }

  console.log("MovieStuff: ", movieStuff);
  const { movieData, rtScore, ytEmbed } = movieStuff;
  console.log(movieData);

  if (movieData) {
    console.log("ytembed: ", ytEmbed);
  }

  return (
    <>
      <main className=" is-fullwidth m-0 p-0 py-6 pop">
        <section id="main-data" className="columns pop">
          <div className="column is-1 is-hidden-mobile pop" />

          <div className="box has-background-light column is-multiline is-10 p-5 m-0 is-justify-content-space-around is-justify-content-center-mobile is-align-items-center is-roundeds">
            <div className="columns is-12 m-0 is-justify-content-space-around is-justify-content-center-mobile is-align-items-center reverse-columns-mobile">
              <div className="column is-8 is-12-mobile p-0 mb-5 has-border-bottom">
                <figure className="image is-16by9 is-10-mobile">
                  <iframe
                    id="yt-embed"
                    className="box p-0 has-ratio is-justify-self-center"
                    // width={640}
                    // height={360}
                    src={
                      ytEmbed
                        ? `${ytEmbed}`
                        : "https://www.youtube.com/embed/bBhKto9diVg"
                    }
                    frameBorder={0}
                    allowFullScreen
                    alt="Movie Trailer"
                    title="Movie Trailer"
                  />
                </figure>
              </div>
              <div className="column is-3 is-10-mobile p-0 mb-5">
                {movieData && (
                  <figure className="">
                    <img
                      id="movie-poster"
                      className="image box is-half-tablet is-fullwidth p-0"
                      src={`${movieData.Poster}`}
                      alt="Movie Poster"
                    />
                  </figure>
                )}
              </div>
            </div>

            {/* Title/Plot */}
            <div className="columns is-multiline is-justify-content-space-between m-0 p-0">
              <div className="column is-12 has-background-dark mb-3 is-roundeds">
                <h1 className="column is-fullwidth has-text-centered has-text-white has-text-weight-bold is-size-3 p-0">
                  {movieData ? movieData.Title : ""}
                </h1>
              </div>
              <div className="column is-12 p-0 has-background-dark is-roundeds">
                <h1 className="column is-fullwidth has-text-centered has-text-white is-size-4 p-0">
                  Plot Summary
                </h1>
              </div>
              <div className="column is-12 p-0">
                {movieData && (
                  <div id="plot-summary" className="column">
                    <p className="is-size-6">{movieData.Plot}</p>
                  </div>
                )}
              </div>

              {/* Left Column */}
              <div className="column is-6 is-12-mobile p-1">
                <h1 className="column is-fullwidth has-background-dark has-text-white is-size-5 p-0 pl-3 is-roundeds">
                  Written By
                </h1>
                {movieData && (
                  <div
                    id="written-by"
                    className="column is-justify-content-space-around is-flex is-flex-direction-column"
                  >
                    <p className="is-size-6">{movieData.Writer}</p>
                  </div>
                )}
                <h1 className="column is-fullwidth has-background-dark has-text-white is-size-5 p-0 pl-3 is-roundeds">
                  Genre
                </h1>
                {movieData && (
                  <div
                    id="genre"
                    className="column is-justify-content-space-around is-flex is-flex-direction-column"
                  >
                    <p className="is-size-6">{movieData.Genre}</p>
                  </div>
                )}
                <h1 className="column is-fullwidth has-background-dark has-text-white is-size-5 p-0 pl-3 is-roundeds">
                  Reviews
                </h1>
                {movieData && (
                  <div
                    id="reviews"
                    className="column is-justify-content-space-around is-flex is-flex-direction-column"
                  >
                    <p className="is-size-6">
                      IMDB: {movieData.imdbRating}
                    </p>
                    <p className="is-size-6">
                      Rotten Tomatoes: {rtScore}
                    </p>
                    <p className="is-size-6">
                      Metacritic: {movieData.Metascore}
                    </p>
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="column is-6 is-12-mobile p-1">
                <h1 className="column is-fullwidth has-background-dark has-text-white is-size-5 p-0 pl-3 is-roundeds">
                  Actors
                </h1>
                {movieData && (
                  <div
                    id="actors"
                    className="column is-justify-content-space-around is-flex is-flex-direction-column"
                  >
                    <h1 className="is-size-6">
                      {movieData.Actors}{" "}
                    </h1>
                  </div>
                )}
                <h1 className="column is-fullwidth has-background-dark has-text-white is-size-5 p-0 pl-3 is-roundeds">
                  Directed By
                </h1>
                {movieData && (
                  <div
                    id="directed-by"
                    className="column is-justify-content-space-around is-flex is-flex-direction-column"
                  >
                    <p className="is-size-6">
                      {movieData.Director}{" "}
                    </p>
                  </div>
                )}
                <h1 className="column is-fullwidth has-background-dark has-text-white is-size-5 p-0 pl-3 is-roundeds">
                  Details
                </h1>
                {movieData && (
                  <div
                    id="details"
                    className="column is-justify-content-space-around is-flex is-flex-direction-column"
                  >
                    <p className="is-size-6">
                      Rated: {movieData.Rated}{" "}
                    </p>
                    <p className="is-size-6">
                      Release Date: {movieData.Released}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="container column is-12">
                <hr />
                <div className="is-flex is-align-items-center is-justify-content-center">
                  <Link 
                    to={`/movie-data/${imdbId}/reviews`} 
                    state={[{searchResults: movieData}, {imdbId}]}
                  >
                    <button className="button is-dark" id="review">
                      View Movie Mate Reviews
                    </button>
                  </Link>
                </div>
            </div>
          </div>
          <div className="column is-1 is-hidden-mobile" />
        </section>
      </main>
    </>
  );
};

export default MovieData;
