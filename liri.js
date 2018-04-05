require("dotenv").config();
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

if (command === "my-tweets"){
    console.log("tweet tweet");
}
if (command === "spotify-this-song"){
    console.log("do rey mi");
}
if (command === "movie-this"){
    console.log("action!");
}
if (command === "do-what-it-says"){
    console.log("simon says");
}