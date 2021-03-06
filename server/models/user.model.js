const config = require('config');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required.'],
            minlength: [2, 'First name must be {MINLENGTH} characters long.'],
            maxlength: [50, 'First Name cannot exceed {MAXLENGTH} characters.']
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required.'],
            minlength: [2, 'Last Name must be {MINLENGTH} characters long.'],
            maxlength: [50, 'Last Name cannot exceed {MAXLENGTH} characters.']
        },
        email: {
            type: String,
            required: [true, '{PATH} is required.'],
            minlength: [5, '{PATH} must be {MINLENGTH} characters long.'],
            maxlength: [255, '{PATH} cannot exceed {MAXLENGTH} characters.'],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please use a valid email address']
        },
        password: {
            type: String,
            required: true,
            minlength: [8, '{PATH} must be {MINLENGTH} characters long.'],
        },
        trips: [{
            type: mongoose.Schema.ObjectId,
            ref: 'Trip',
            required: false,
        }]
    }
);

UserSchema.methods.generateAuthToken = function generateAuthToken() {
    return jwt.sign({ _id: this._id, firstName: this.firstName, lastName: this.lastName }, config.get('jwtPrivateKey'));
}

const User = mongoose.model('User', UserSchema);

module.exports = User;