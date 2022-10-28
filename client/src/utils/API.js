import axios from 'axios';

// Make a search to oMDB
export const searchMovie = async (query) => {
    // ---------- Search OMDB for data ---------- //

    // OMDB Key Variables
    const omdbSearch = 'https://www.omdbapi.com/?i=' // Search by imdbId
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbPlot = '&plot=full'

    const searchValue = query // Working
    console.log(searchValue); // Working

    const searchResult = omdbSearch + searchValue + omdbPlot + omdbApiKey;
    console.log(searchResult);

    try {
        const movieDataObject = await axios.get(searchResult);
        console.log(movieDataObject)
        const movieData = movieDataObject.data;
        console.log(movieData) // Working

        // Pull Rotten Tomatoes from movieData.Ratings
        let rtScore = movieData.Ratings[1]
        if (rtScore) {
            rtScore = JSON.stringify(rtScore.Value)
            rtScore = rtScore.substring(1, 4)
        } else {
            rtScore = "N/A"
        }
        // console.log(rtScore.Value) // Working

        // ---------- Search Youtube for trailer ---------- //

        // Youtube Search Variables
        // var youTubeApiKey = 'AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s' // Steve's Key
        const ytSearch = 'https://youtube.googleapis.com/youtube/v3/search?q='
        const plusTrailer = " movie trailer"
        const ytApiKey = '&key=AIzaSyArL85QacNinNMsTR0SLDijTFsPP8JkT0s'
        const ytPart = '&part=snippet'
        const ytType = '&type=video'
        const ytResults = '&maxResults=1'
        const ytEmbedBase = 'https://www.youtube.com/embed/'
        const title = movieData.Title
        const year = movieData.Year
        // Define youtube search
        var ytSearchResult = ytSearch + title + " " + year + plusTrailer + ytPart + ytType + ytResults + ytApiKey

        // Fetch youtube data
        try {
            const ytResult = await axios.get(ytSearchResult)
            const ytEmbedId = ytResult.data.items[0].id.videoId
            const ytEmbed = ytEmbedBase + ytEmbedId;
    
            // console.log('\n\ndata.items:',ytResult.data.items[0].id.videoId,'\n\n'); // Working

            return {movieData, rtScore, ytEmbed};
        } catch (err) {
            console.log(err)

            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                if (err.response.status === 403) {
                  const ytEmbed = ''
                  return {movieData, rtScore, ytEmbed};
                }
                return
            };
        };

    } catch (err) {
      console.log(err)
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            return;
        };
    };
}

// Search OMDB using search bar value
export const searchOMDB = async () => {
    // OMDB Key Variables
    const omdbSearch = 'https://www.omdbapi.com/?s=' // change t to s if you want a list of similar movie names
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbType = '&type=movie'

    // Define the movie searchbar object
    const searchEl = document.querySelector("#srch-title");

    // Set up the search parameters
    const searchValue = searchEl.value;
    const searchResult = omdbSearch + searchValue + omdbType + omdbApiKey
  
    // Start search
    try {
      const response = await axios.get(searchResult);
      // console.log(response.data.Search); // Working
  
      // Add History Button for search history
  
      // Define Variables
      var movieSave = searchEl.value.toLowerCase();
      console.log("Movie save name: " + movieSave)
      console.log("Storage Test: ", localStorage.getItem("MovieMate: " + movieSave), movieSave)
  
      // Don't add history button if local storage already exists
    //   if (!localStorage.getItem("MovieMate: " + movieSave)) {
    //     // If no local storage, then:
    //     localStorage.setItem("MovieMate: " + movieSave, movieSave)
    //     console.log(localStorage.getItem("MovieMate: " + movieSave))  
  
    //     var newLink = document.createElement("a");
  
    //     newLink.classList.add("dropdown-item", "is-capitalized");
    //     newLink.textContent = searchEl.value;
    //     console.log(newLink.textContent)
    //     console.log(newLink)
    //     console.log(dropDownMenuContent)
  
    //     dropDownMenuContent.prepend(newLink);
    //     }
  
      // Return list of movie objects based on search parameters
      return response.data.Search;
    } catch (err) {
      if (err.response) {
          console.log(err.response.data);
          console.log(err.response.status);
          console.log(err.response.headers);
      };
    };
  }
