const store = require('./store');

function getSchedules() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
}

function addSchedule(day, time) {
    return new Promise((resolve, reject) => {
        if (!day || !time) {
            console.error('[messageController] No hay dia u horario');
            reject('Los datos son incorrectos');
            return false;
        }

        const schedule = {
            day: day,
            time: time,
            date: new Date(),
        }

        store.add(schedule);
        resolve(schedule);
    })
}

function updateSchedule(id, day, time) {
    return new Promise(async(resolve, reject) => {
        if (!id) {
            reject('Id invalid');
            return false;
        }
        const scheduleUpdated = {
            day: day,
            time: time,
            date: new Date(),
        }
        const result = await store.updateSchedule(id, scheduleUpdated);

        resolve(result);
    })
}

function deleteSchedule(id) {
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
    addSchedule,
    getSchedules,
    updateSchedule,
    deleteSchedule,
}