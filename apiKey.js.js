const API_KEY = 'YOUR_API_KEY_HERE';
module.exports = API_KEY;
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const API_KEY = require('./apiKey');
const server = express();
server.use(bodyParser.urlencoded({
    extended: true
}));

server.use(bodyParser.json());
server.post('/get-movie-details', (req, res) => {

    const movieToSearch = req.body.result && req.body.result.parameters && req.body.result.parameters.movie ? req.body.result.parameters.movie : 'The Godfather';
    const reqUrl = encodeURI(`http://www.omdbapi.com/?t=${movieToSearch}&apikey=${API_KEY}`);
    http.get(reqUrl, (responseFromAPI) => {
        let completeResponse = '';
        responseFromAPI.on('data', (chunk) => {
            completeResponse += chunk;
        });
        responseFromAPI.on('end', () => {
            const movie = JSON.parse(completeResponse);
            let dataToSend = movieToSearch === 'The Godfather' ? `I don't have the required info on that. Here's some info on 'The Godfather' instead.\n` : '';
            dataToSend += `${movie.Title} is a ${movie.Actors} starer ${movie.Genre} movie, released in ${movie.Year}. It was directed by ${movie.Director}`;

            return res.json({
                speech: dataToSend,
                displayText: dataToSend,
                source: 'get-movie-details'
            });
        });
    }, (error) => {
        return res.json({
            speech: 'Something went wrong!',
            displayText: 'Something went wrong!',
            source: 'get-movie-details'
        });
    });
});
{
    "Title"; "The Godfather",
    "Year"; "1972",
    "Rated"; "R",
    "Released"; "24 Mar 1972",
    "Runtime"; "175 min",
    "Genre"; "Crime, Drama",
    "Director"; "Francis Ford Coppola",
    "Writer"; "Mario Puzo (screenplay by), Francis Ford Coppola (screenplay by), Mario Puzo (based on the novel by)",
    "Actors"; "Marlon Brando, Al Pacino, James Caan, Richard S. Castellano",
    "Plot"; "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    "Language"; "English, Italian, Latin",
    "Country"; "USA",
    "Awards"; "Won 3 Oscars. Another 24 wins & 27 nominations.",
    "Poster"; "https://images-na.ssl-images-amazon.com/images/M/MV5BY2Q2NzQ3ZDUtNWU5OC00Yjc0LThlYmEtNWM3NTFmM2JiY2VhXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
    "Ratings"; [
      {
        "Source": "Internet Movie Database",
        "Value": "9.2/10"
      },
      {
        "Source": "Rotten Tomatoes",
        "Value": "98%"
      },
      {
        "Source": "Metacritic",
        "Value": "100/100"
      }
    ],
    "Metascore"; "100",
    "imdbRating"; "9.2",
    "imdbVotes"; "1,313,968",
    "imdbID"; "tt0068646",
    "Type"; "movie",
    "DVD"; "09 Oct 2001",
    "BoxOffice"; "N/A",
    "Production"; "Paramount Pictures",
    "Website"; "http://www.thegodfather.com",
    "Response"; "True"
  }
  server.listen((process.env.PORT || 8000), () => {
    console.log("Server is up and running...");
});