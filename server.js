const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const actors = require('./routers/actor');
const movies = require('./routers/movie');
const app = express();
app.listen(80);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/", express.static(path.join(__dirname, 'dist/movielib')));


mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');
});
//Configuring Endpoints
//Actor RESTFul endpoints
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/:movies', actors.addMovie);
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actors/:actorid/:movieid', actors.deleteMovieFromActor);
app.get('/actors/:year1/:year2', actors.getByByear);

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:id', movies.deleteOne);
app.delete('/movies/:movieid/:actorid', movies.deleteActorFromMovie);
app.post('/movies/:movieid/:actorid', movies.addActorToMovie);
app.get('/movies/year/:year1/:year2', movies.movieByYear);
app.delete('/movies/cascade/:id', movies.casDelete);
