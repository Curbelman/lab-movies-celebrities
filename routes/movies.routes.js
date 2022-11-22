const router = require("express").Router();
const Movie = require("../models/Movie.model");
const Celebrity = require("../models/Celebrity.model")

router.get('/create',(req,res)=>{
    Celebrity.find()
    .then(allCelebrities => res.render('movies/new-movie.hbs', {celebrities: allCelebrities}))
})

router.post('/create',(req,res)=>{
    const { title, genre, plot, cast } = req.body;
    Movie.create({title, genre, plot, cast})
     .then (() => res.redirect('/movies'))
     .catch(err => console.log(err))
})

router.get('/', (req,res)=>{
    Movie.find()
    .then (foundMovies => res.render('movies/movies.hbs', {movieList: foundMovies}))
    .catch(err => res.send(err))
})

router.get('/:id', (req,res) =>{
    const { id } = req.params;
    Movie.findById(id)
    .populate('cast')
    .then(selectedMovie => res.render('movies/movie-details.hbs', {movie: selectedMovie}))
    .catch(err => res.send(err))
})

router.post('/:id/delete', (req, res) => {
    const { id } = req.params;
    Movie.findByIdAndRemove(id)
    .then(deletedFilm => res.redirect('/movies'))
    .catch(err => res.send(err))
})

module.exports = router;