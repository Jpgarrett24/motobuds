const mongoose = require('mongoose');

const TripSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, '{Path} is required.']
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
                type: { type: String, enum: ['Point'], required: true },
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
                type: { type: String, enum: ['Point'], required: true },
                coordinates: {
                    type: [Number],
                    required: true,
                }
            }
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