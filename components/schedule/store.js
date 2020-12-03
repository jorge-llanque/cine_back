const Model = require('./model');

function addSchedule(schedule) {
    const mySchedule = new Model(schedule);
    mySchedule.save();
}

function getSchedules() {
    return Model.find();
}

async function updateSchedule(id, scheduleUpdated) {
    const newSchedule = await Model.findOne({
        _id: id
    });

    newSchedule.day = scheduleUpdated.day;
    newSchedule.time = scheduleUpdated.time;

    const realized = await newSchedule.save();
    return realized;


}

function removeSchedule(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addSchedule,
    list: getSchedules,
    updateSchedule: updateSchedule,
    remove: removeSchedule,
}