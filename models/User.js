const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
    value: { type: String, enum: ['user', 'admin']}
})

const userSchema = new Schema( {
    username: { type: String, require: 3},
    hashedPass: { type: String, require: true },
    roles: { type: [roleSchema], default: ['user']}
});

const User = model ('User', userSchema);

module.exports = User;