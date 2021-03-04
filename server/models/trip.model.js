const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '{PATH} is required.']
        },
        startDate: {
            type: Date,
            default: Date.now,
            required: [true, 'A start date and time is required']
        },
        from: {
            address: {
                type: String,
            },
            location: {
                type: { type: String, enum: ['Point'], required: [true, 'Starting location is required'] },
                coordinates: {
                    type: [Number],
                    required: true,
                }
            }
        },
        to: {
            address: {
                type: String,
            },
            location: {
                type: { type: String, enum: ['Point'], required: [true, 'End location is required'] },
                coordinates: {
                    type: [Number],
                    required: true,
                }
            }
        },
        creator: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: [true, 'User is required.']
        },
        riders: [{
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: false,
        }],
    },
    { timestamps: true }
);

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;