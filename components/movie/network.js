const express = require('express');
const controller = require('./controller');
const response = require('../../network/response');
const multer = require('multer');
const config = require('../../config');
const Role = require('../../helpers/role');
const authorize = require('../../middleware/role');
const auth = require('../../middleware/auth');


const router = express.Router();

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        /*   console.log(req.files['coverImage']); */
        if (req.files['coverImage']) {
            cb(null, 'public/' + config.filesRoute + '/coverImages/')
        } else {
            cb(null, 'public/' + config.filesRoute + '/posterImages/')
        }
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + '.jpg')
    }
})

const upload = multer({
    storage: storage
})

var cpUpload = upload.fields([{ name: 'posterImage', maxCount: 1 }, { name: 'coverImage', maxCount: 1 }])

router.get('/', [auth, authorize([Role.Admin, Role.User])], (req, res) => {
    controller.getMovies()
        .then(title => {
            response.success(req, res, title, 200);
        })
        .catch(err => {
            response.error(req, res, 'Internal error', 500, err);
        });
});

router.post('/', cpUpload, (req, res) => {
    controller.addMovie(
            req.body.title,
            req.body.format,
            req.body.casting,
            req.body.released,
            req.body.lenguage,
            req.body.genre,
            req.body.summary,
            req.files
        ).then((movie) => {
            response.success(req, res, movie, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, e);
        })
});

/* router.post('/', upload.single('file'), (req, res) => {
    console.log(req.file);
    controller.addMovie(
            req.body.title,
            req.body.format,
            req.body.casting,
            req.body.released,
            req.body.lenguage,
            req.body.genre,
            req.body.summary,
            req.file
        ).then((movie) => {
            response.success(req, res, movie, 201);
        })
        .catch(e => {
            response.error(req, res, 'Informacion invalida', 400, e);
        })
}); */

router.put('/:id', cpUpload, (req, res) => {
    controller.updateMovie(
            req.params.id,
            req.body.title,
            req.body.format,
            req.body.casting,
            req.body.released,
            req.body.lenguage,
            req.body.genre,
            req.body.summary,
            req.files
        ).then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});

router.delete('/:id', (req, res) => {
    controller.deleteMovie(req.params.id)
        .then((data) => {
            response.success(req, res, data, 200);
        })
        .catch(e => {
            response.error(req, res, 'Error interno', 500, e);
        });
});



module.exports = router;