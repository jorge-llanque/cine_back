const Model = require('./model');

function addRoom(room) {
    const myRoom = new Model(room);
    myRoom.save();
}

function getRooms() {
    return Model.find();
}

async function updateRoom(id, roomUpdated) {
    const newRoom = await Model.findOne({
        _id: id
    });

    newRoom.name = roomUpdated.name;
    newRoom.capacity = roomUpdated.capacity;

    const realized = await newRoom.save();
    return realized;


}

function removeRoom(id) {
    return Model.deleteOne({
        _id: id
    });
}

module.exports = {
    add: addRoom,
    list: getRooms,
    updateRoom: updateRoom,
    remove: removeRoom,
}

/* router.put('/:id', [
    check('company').isLength({ min: 3 }),
    check('model').isLength({ min: 3 })
], async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const car = await Car.findByIdAndUpdate(req.params.id, {
        company: req.body.company,
        model: req.body.model,
        year: req.body.year,
        sold: req.body.sold,
        price: req.body.price,
        extras: req.body.extras
    }, { new: true })

    if (!car) {
        return res.status(404).send('El coche con ese Id no está')
    }

    res.status(204).send()

}) */