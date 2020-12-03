const store = require('./store');

function getProgramation() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
}

function addProgramation(movie, room, schedule) {
    return new Promise((resolve, reject) => {
        if (!movie || !room || !schedule) {
            console.error('[messageController] No hay movie o pelicula o schedule');
            reject('Los datos son incorrectos');
            return false;
        }

        const programation = {
            movie: movie,
            room: room,
            schedule: schedule,
            date: new Date()
        };

        store.add(programation);
        resolve(programation);
    });
}

function updateProgramation(id, movie, room, schedule) {
    return new Promise(async(resolve, reject) => {
        if (!id || !movie || !room || !schedule) {
            reject('Invalid data');
            return false;
        }

        const result = await store.updateProgramation(id, movie, room, schedule);
        resolve(result);
    })
}

function deleteProgramation(id) {
    return new Promise((resolve, reject) => {
        if (!id) {
            reject('Id invalid');
            return false;
        }

        store.remove(id)
            .then(() => {
                resolve();
            }).catch((e) => {
                reject(e);
            });
    });
}


module.exports = {
    getProgramation,
    addProgramation,
    updateProgramation,
    deleteProgramation,
}