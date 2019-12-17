const { Router } = require('express');
const Trip = require('../models/Trip');
const IntineraryItem = require('../models/ItineraryItem');
const fetchWoeId = require('../middleware/fetch-woeid');

module.exports = Router()
    .post('/api/v1/trips', fetchWoeId, (req, res, next) => {
        const woeId = req.woeId;
        Trip
            .create({ 
                ...req.body,
                woeId
            })
            .then(trip => res.send(trip))
            .catch(next);
    })
    .get('/api/v1/trips', (req, res) => {
        Trip
            .find()
            .select({ name: true, location: true })
            .then(trip => res.send(trip));
    })
    .get('/api/v1/trips/:id', (req, res) => {
        Trip
            .findById(req.params.id, req.body)
            .then(trip => res.send(trip));
    })
    .patch('/api/v1/trips/:id', (req, res) => {
        Trip
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(trip => res.send(trip));
    })
    .delete('/api/v1/trips/:id', (req, res) => {
        Promise.all([
            Trip.findByIdAndDelete(req.params.id, req.body),
            IntineraryItem.deleteMany({ tripId: req.params.id })
        ])
            .then(trip => res.send(trip));
    });
