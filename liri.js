require("dotenv").config();
//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var command = process.argv[2];

if (command === "my-tweets") {
    console.log("tweet tweet");
}
if (command === "spotify-this-song") {
    console.log("do rey mi");
}
if (command === "movie-this") {
    var movieName = "";
    for (var i = 3; i < process.argv.length; i++) {
        movieName = movieName + process.argv[i] + " ";
    }
    if (movieName === "") {
        movieName = "Mr. Nobody";
    };
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    //console.log(queryUrl);
    var request = require("request");
    request(queryUrl, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            //             Title of the movie.
            console.log("Title: " + JSON.parse(body).Title);
            //   * Year the movie came out.
            console.log(JSON.parse(body).Title + " was released in " + JSON.parse(body).Year + ".");
            //   * IMDB Rating of the movie.
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating)
            //   * Rotten Tomatoes Rating of the movie.
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            //   * Country where the movie was produced.
            console.log("This movie was produced in " + JSON.parse(body).Country);
            //   * Language of the movie.
            console.log("This movie is in " + JSON.parse(body).Language);
            //   * Plot of the movie.
            console.log("Plot: " + JSON.parse(body).Plot);
            //   * Actors in the movie.
            console.log("Actors in this movie: " + JSON.parse(body).Actors);

        }
    })
}
if (command === "do-what-it-says") {
    console.log("simon says");
}