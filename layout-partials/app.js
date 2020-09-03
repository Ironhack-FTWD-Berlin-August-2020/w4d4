const express = require('express');
const app = express();
const handlebars = require('hbs');

const movies = require('./movies.json');

// console.log(movies);

app.use(express.static('public'));

handlebars.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');


app.get('/', (req, res) => {
    // to skip layout for a route: pass layout: false into object
    res.render('moviesView', { moviesArray: movies })
});

app.get('/godfather', (req, res) => {
    const godfather = movies.find(movie => movie.title === 'The Godfather');
    console.log(godfather);
    res.render('movieDetails', { clickedMovie: godfather });
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});