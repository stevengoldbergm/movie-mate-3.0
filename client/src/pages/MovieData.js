import React, { useEffect } from "react";
import { searchMovie } from "../utils/API";
import axios from 'axios'

const testMovie = 'tt0103064'

const MovieData = () => {
    useEffect(() => {
        const handleSearch = async () => {
            try {
                const result = await searchMovie(testMovie);
                // const result = await axios.get('https://www.omdbapi.com/?i=tt0103064&plot=full&apikey=c26a6eef');
                console.log(result)
                return result;
            } catch (err) {
                console.log('error:', err);
            }
        }
        handleSearch();
    }, [])

    return (
        <>
            <h2>blah</h2>
            {/* Add Axios connection */}
            {/* <script src="/axios/dist/axios.min.js"></script> */}

            {/* <!-- Column 2 (section with 2 columns) --> */}
            {/* <div className="columns column is-multiline is-10 pl-5 pr-5 no-margins is-justify-content-center-mobile has-background-white top-layer" /> */}


            {/* <!-- Column 2.1 -->
            <!-- Movie Poster on Left --> */}
            {/* <figure className="column is-two-fifths is-10-mobile is-offset-1-mobile mt-3">
            <img id="movie-poster" className="image is-2by3 is-half-tablet is-fullwidth pt-0 pr-0" src="{{movieData.Poster}}" alt="Movie Poster" />
            </figure> */}

            {/* <!-- Column 2.2 -->
            <!-- Movie Details on Right --> */}
            {/* <div id="movie-data" className="column is-three-fifths is-half-tablet mt-3 is-justify-content-space-around is-flex is-flex-direction-column">
            <h1 className="title is-size-2 papyrus">{movieData.Title} </h1>
            <h1 className="title is-size-4 subtitle courier-new">Actors: {movieData.Actors} </h1>
            <p className="subtitle is-size-4 courier-new">Director: {movieData.Director} </p>
            <p className="is-size-5 fantasy">Rated: {movieData.Rated} </p>
            <p className="is-size-5 fantasy">Release Date: {movieData.Released}</p>
            <p className="is-size-5 fantasy">IMDB: {movieData.imdbRating}</p>
            <p className="is-size-5 fantasy">Rotten Tomatoes: {rtScore}</p>
            <p className="is-size-5 fantasy">Metacritic: {movieData.Metascore}</p>
            <br />
            <button className="button is-info" id="review">View Movie Mate Reviews</button>
            <hr />
            <p className="is-size-5">Genre: {movieData.Genre} </p>
            <p className="is-size-5">Writers: {movieData.Writer} </p>
            <p className="is-size-5">Plot Summary: </p>
            <p className="is-size-6">
                {movieData.Plot}
            </p>
            </div>

            < div className="column is-full">
                <hr /> */}
                
                {/* <!-- Youtube Trailer embed -->
                <!-- Goes below the 2 column section --> */}
                {/* <figure className="image is-16by9 mb-5">
                    <iframe id="yt-embed" className="has-ratio is-justify-self-center" width={640} height={360} src={ytEmbed} frameBorder={0} allowFullScreen alt="Movie Trailer" title="Movie Trailer"/>
                </figure>
            </div> */}
        </>
    )
} 

export default MovieData;