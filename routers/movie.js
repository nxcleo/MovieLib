var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({}).populate('actors').exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            console.log(movie);
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    deleteOne: function (req, res) {
        Movie.findOneAndDelete({ _id: req.params.id}, function (err, doc) {
            if (err) return res.status(400).json(err);
            res.json();

        })
    },
    casDelete: function (req, res) {
        Movie.findOneAndDelete({ _id: req.param.id }, req.body, function (err) {
            if (err) return res.status(400).json(err);
            res.json();


        });
        Actor.update(
            { },
            { $pull: { movies: req.param.id } },
            { multi: true }
        );
    },
    deleteActorFromMovie: function (req, res) {
        Movie.findById(req.params.movieid, function (err, movie) {
            for (let a; a < movie.actors.length; a ++)
            {
                if (movie.actors[a] == new mongoose.Schema.ObjectId(req.params.actorid)){
                    movie.actors.splice(a, 1);
                    Movie.findByIdAndUpdate(req.params.movieid, {actors: movie.actors}, function (err) {
                        if (err) return res.status(400).json(err);
                        res.json();
                    })
                }
            }
        })

    },
    addActorToMovie: function (req, res) {
        Movie.findById(req.params.movieid, function (err, movie) {
            movie.actors.push(new mongoose.Schema.ObjectId(req.params.actorid));
            Movie.findByIdAndUpdate(req.params.movieid, {actors: movie.actors}, function (err) {
                if (err) return res.status(400).json(err);
                res.json();
            });
        })

    },
    movieByYear: function (req, res) {
        Movie.where('year').gte(req.params.year2).lte(req.params.year1).exec(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        })
    }

};
