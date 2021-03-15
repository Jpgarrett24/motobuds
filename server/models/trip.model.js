const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
    {
        startDate: {
            type: Date,
            default: Date.now,
            required: [true, 'A start date and time is required']
        },
        from: {
            city: {
                type: String,
                required: [true, 'City is required']
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
            city: {
                type: String,
                required: [true, 'City is required']
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
        routeUrl: {
            type: String,
            required: false,
        }
    },
    { timestamps: true }
);

const Trip = mongoose.model('Trip', TripSchema);

module.exports = Trip;