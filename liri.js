require("dotenv").config();

var inquirer = require("inquirer");
var fs = require("fs");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require("twitter");

var command = process.argv[2];

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

if (process.argv.length > 3) throw "Only type the command here. Options are: spotify-this-song, my-tweets, movie-this, and do-what-it-says. You will be asked for the item you want to search for later!";

if (command === "my-tweets") {
    //console.log("tweet tweet");
    var params = { screen_name: 'michaelsadummy' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            for (var k = 0; k < tweets.length; k++) {
                
                console.log("Tweet: "+tweets[k].text);
                console.log("Created at: "+tweets[k].created_at);
            }
            console.log("Number of Tweets: "+tweets.length);
        }
    });
}
if (command === "spotify-this-song") {
    inquirer.prompt([
        {
            type: "input",
            message: "What song would you like search for?",
            name: "song"
        }
    ]).then(function (inquirerResponse) {
        var songToSearch = "";
        if (inquirerResponse.song === "") {
            songToSearch = "The Sign";
        }
        else {
            songToSearch = inquirerResponse.song;
        }

        

        spotify.search({ type: 'track', query: songToSearch }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //  artist(s)

            for (var j = 0; j < 5; j++) {
                var artistsArr = [];
                for (var i = 0; i < data.tracks.items[j].artists.length; i++) {
                    artist = data.tracks.items[j].artists[i].name
                    artistsArr.push(artist);
                }
                console.log("-------------------------------");
                console.log("Artist(s): " + artistsArr.join(", "));
                //  The song's name
                console.log("Song Title: " + data.tracks.items[j].name);
                //  A preview link of the song from Spotify
                console.log("Preview Here " + data.tracks.items[j].preview_url);

                //  The album that the song is from
                console.log("Album: " + data.tracks.items[j].album.name)
                console.log("-------------------------------");
            }


        });
    })

}
if (command === "movie-this") {

    inquirer.prompt([
        {
            type: "input",
            message: "What movie would you like to search for?",
            name: "movie"
        }
    ]).then(function (inquirerResponse) {
        var movieName = "";
        movieName = inquirerResponse.movie;

        if (movieName === "") {
            movieName = "Mr. Nobody";
        }

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
        

        spotify.search({ type: 'track', query: spotifyThis }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            //  artist(s)
            //var artistsArr = [];
            for (var i = 0; i < data.tracks.items[0].artists.length; i++) {
                artist = data.tracks.items[0].artists[i].name
                console.log("Artist(s): " + artist);
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