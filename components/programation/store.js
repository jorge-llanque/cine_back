const Model = require('./model');


function getProgramation() {
    return new Promise((resolve, reject) => {
        Model.find()
            .populate('movie')
            .populate('room')
            .populate('schedule')
            .exec((error, populated) => {
                if (error) {
                    reject(error);
                    return false;
                }
                resolve(populated);
            });
    })
}


function addProgramation(programation) {
    const myProgramation = new Model(programation);
    myProgramation.save();
}


async function updateProgramation(id, movie, room, schedule) {
    const newProgramation = await Model.findOne({
        _id: id
    });

    newProgramation.movie = movie;
    newProgramation.room = room;
    newProgramation.schedule = schedule;

    const realized = await newProgramation.save();
    return realized;
}

function removeProgramation(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addProgramation,
    list: getProgramation,
    updateProgramation: updateProgramation,
    remove: removeProgramation,
}