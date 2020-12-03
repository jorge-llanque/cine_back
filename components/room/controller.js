const store = require('./store');

function getRooms() {
    return new Promise((resolve, reject) => {
        resolve(store.list());
    })
}

function addRoom(name, capacity) {
    return new Promise((resolve, reject) => {
        if (!name || !capacity) {
            console.error('[messageController] No hay nombre o capacidad');
            reject('Los datos son incorrectos');
            return false;
        }

        const room = {
            name: name,
            capacity: capacity,
            date: new Date(),
        }

        store.add(room);
        resolve(room);
    })
}

function updateRoom(id, name, capacity) {
    return new Promise(async(resolve, reject) => {
        if (!id) {
            reject('Id invalid');
            return false;
        }
        const roomUpdated = {
            name: name,
            capacity: capacity,
            date: new Date(),
        }
        const result = await store.updateRoom(id, roomUpdated);

        resolve(result);
    })
}

function deleteRoom(id) {
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
    addRoom,
    getRooms,
    updateRoom,
    deleteRoom,
}