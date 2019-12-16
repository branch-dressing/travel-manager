const { Router } = require('express');
const Trip = require('../models/Trip');
//const IntineraryItem = require('../models/ItineraryItem');

module.exports = Router()
    .post('/api/v1/trips', (req, res) => {
        Trip
            .create(req.body)
            .then(trip => res.send(trip));
    })
    .get('/api/v1/trips', (req, res) => {
        Trip
            .find()
            .select({ name: true, location: true })
            .then(trip => res.send(trip));
    });
