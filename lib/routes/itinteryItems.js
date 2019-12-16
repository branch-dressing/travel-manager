const { Router } = require('express');
const ItineraryItem = require('../models/ItineraryItem');

module.exports = Router()
    .post('/api/v1/itineraryitems', (req, res) => {
        ItineraryItem
            .create(req.body)
            .then(itineraryItem => res.send(itineraryItem));
    })
    .get('/api/v1/itineraryitems', (req, res) => {
        ItineraryItem
            .find()
            .select({ recipeId: true })
            .then(itineraryitems => res.send(itineraryitems));
    })
    .get('/api/v1/itineraryitems/:id', (req, res) => {
        ItineraryItem
            .findById(req.params.id)
            .populate('tripId')
            .then(itineraryItem => res.send(itineraryItem));
    })
    .patch('/api/v1/itineraryitems/:id', (req, res) => {
        ItineraryItem
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(itineraryItem => res.send(itineraryItem));
    })
    .delete('/api/v1/itineraryitems/:id', (req, res) => {
        ItineraryItem
            .findByIdAndDelete(req.params.id)
            .then(itineraryItem => res.send(itineraryItem));
    });