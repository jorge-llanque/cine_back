const store = require('./store');
const config = require('../../config');

function getMovies() {
    return store.list();
}

function addMovie(title, format, casting, released, lenguage, genre, summary, files) {
    return new Promise((resolve, reject) => {
        if (!title || !format || !casting || !released || !lenguage || !genre || !summary) {
            console.error('[messageController] No estan completos los valores definido por el modelo');
            reject('Los datos son incorrectos');
            return false;
        }

        /*   console.log(files['file'][0].filename); */

        let posterImageUrl = '';
        let coverImageUrl = '';

        if (files) {
            posterImageUrl = config.host + ':' + config.port + config.publicRoute + '/' + config.filesRoute + '/posterImages/' + files['posterImage'][0].filename;
            coverImageUrl = config.host + ':' + config.port + config.publicRoute + '/' + config.filesRoute + '/coverImages/' + files['coverImage'][0].filename;
        }

        const movie = {
            title: title,
            format: format,
            casting: casting,
            released: released,
            lenguage: lenguage,
            genre: genre,
            summary: summary,
            posterImage: posterImageUrl,
            coverImage: coverImageUrl,
            date: new Date(),
        };

        store.add(movie);
        resolve(movie);
    });
}

function updateMovie(id, title, format, casting, released, lenguage, genre, summary, files) {
    return new Promise(async(resolve, reject) => {
        if (!id) {
            reject('Id invalid');
            return false;
        }

        let posterImageUrl = '';
        let coverImageUrl = '';

        if (files) {
            posterImageUrl = config.host + ':' + config.port + config.publicRoute + '/' + config.filesRoute + '/posterImages/' + files['posterImage'][0].filename;
            coverImageUrl = config.host + ':' + config.port + config.publicRoute + '/' + config.filesRoute + '/coverImages/' + files['coverImage'][0].filename;
        }

        const movieUpdated = {
            title: title,
            format: format,
            casting: casting,
            released: released,
            lenguage: lenguage,
            genre: genre,
            summary: summary,
            posterImage: posterImageUrl,
            coverImage: coverImageUrl,
            date: new Date(),
        }

        const result = await store.updateMovie(id, movieUpdated);

        resolve(result);
    })
}

function deleteMovie(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id invalido');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            })
            .catch(e => {
                reject(e);
            });
    })
}


module.exports = {
    addMovie,
    getMovies,
    updateMovie,
    deleteMovie
}