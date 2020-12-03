const Model = require('./model');

function addMovie(movie) {
    const myMovie = new Model(movie);
    myMovie.save();
}

function listMovies() {
    return Model.find();
}

async function updateMovie(id, movieUpdated) {
    const newMovie = await Model.findOne({
        _id: id
    });
    newMovie.title = movieUpdated.title;
    newMovie.format = movieUpdated.format;
    newMovie.casting = movieUpdated.casting;
    newMovie.released = movieUpdated.released;
    newMovie.lenguage = movieUpdated.lenguage;
    newMovie.genre = movieUpdated.genre;
    newMovie.summary = movieUpdated.summary;
    newMovie.posterImage = movieUpdated.posterImage;
    newMovie.coverImage = movieUpdated.coverImage;
    newMovie.date = movieUpdated.date;

    const realized = await newMovie.save();
    return realized;
}

function removeMovie(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addMovie,
    list: listMovies,
    updateMovie: updateMovie,
    remove: removeMovie
}