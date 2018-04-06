require("dotenv").config();
//var spotify = new Spotify(keys.spotify);
//var client = new Twitter(keys.twitter);

var fs = require("fs");
var command = process.argv[2];


if (command === "my-tweets") {
    console.log("tweet tweet");
}
if (command === "spotify-this-song") {
    //console.log("do rey mi");
    var songToSearch = "";
    for (var i = 3; i < process.argv.length; i++) {
        songToSearch = songToSearch + process.argv[i] + " ";
    }
    if (songToSearch === "") {
        songToSearch = "The Sign";
    }
    var keys = require("./keys.js");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify(keys.spotify);

    spotify.search({ type: 'track', query: songToSearch }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        //  artist(s)
        //var artistsArr = [];
        for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
            artist = data.tracks.items[0].artists[i].name
            console.log("Song by: " + artist);
        }
        //  The song's name
        console.log("Song Title: " + data.tracks.items[0].name);
        //  A preview link of the song from Spotify
        console.log("Preview Here " + data.tracks.items[0].preview_url);

        //  The album that the song is from
        console.log("Album: " + data.tracks.items[0].album.name)



    });
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
    //console.log("simon says");

    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        //console.log(data);

        var dataArr = data.split(",");

        //console.log(dataArr);
        //console.log(dataArr[1]);
        var spotifyThis = dataArr[1];
        var keys = require("./keys.js");
        var Spotify = require('node-spotify-api');
        var spotify = new Spotify(keys.spotify);

        spotify.search({ type: 'track', query: spotifyThis }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //  artist(s)
            //var artistsArr = [];
            for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                artist = data.tracks.items[0].artists[i].name
                console.log("Song by: " + artist);
            }
            //  The song's name
            console.log("Song Title: " + data.tracks.items[0].name);
            //  A preview link of the song from Spotify
            console.log("Preview Here " + data.tracks.items[0].preview_url);

            //  The album that the song is from
            console.log("Album: " + data.tracks.items[0].album.name)



        });
    })
}