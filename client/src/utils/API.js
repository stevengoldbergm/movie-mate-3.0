const axios = require('axios')

// Make a search to oMDB
export const searchMovie = async (query) => {
    // ---------- Search OMDB for data ---------- //

    // OMDB Key Variables
    const omdbSearch = 'https://www.omdbapi.com/?i=' // Search by imdbId
    const omdbApiKey = '&apikey=c26a6eef'
    const omdbPlot = '&plot=full'

    const searchValue = query // Working
    console.log(searchValue); // Working

    const searchResult = omdbSearch + searchValue + omdbPlot + omdbApiKey

    try {
        let movieData = await axios.get(searchResult);
        movieData = movieData.data;
        console.log(movieData) // NOT Working

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
            // console.log(ytResult); // Working
            const ytData = {
              ytResult,
              ytEmbedId,
              ytEmbed
            }
            return {movieData, rtScore, ytData};
    
            // Page won't be rendered in this way - can delete once the code is working.
            // res.render('movieDetails', { search: false, movieDetails: true, movieData, rtScore, ytEmbed, loggedIn: req.session.logged_in, imdbID: query }); 
        } catch (err) {
            if (err.response) {
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);
                return;
            };
        };

    } catch (err) {
        if (err.response) {
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
            return;
        };
    };
}
