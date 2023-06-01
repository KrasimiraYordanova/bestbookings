const { Schema, model, Types } = require('mongoose');

const facilitySchema = new Schema({
    label: {type: String, require: true},
    iconUrl: {type: String},
    rooms: { type: [Types.ObjectId], default: [], ref: 'Room'}
});

const Facility = model('Facility', facilitySchema);

module.exports = Facility;