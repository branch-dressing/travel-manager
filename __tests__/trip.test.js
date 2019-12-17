require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');

describe('app routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates a trip', () => {
        return request(app)
            .post('/api/v1/trips')
            .send({
                name: 'My first Trip',
                location: 'Portland'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'My first Trip',
                    location: 'Portland',
                    __v: 0
                });
            });
    });

    it('gets all trips', async() => {
        const trips = await Trip.create([
            { name: 'Trip 1', location: 'London' },
            { name: 'Trip 2', location: 'Seattle, WA' },
            { name: 'Trip 3', location: 'New York, NY' },
        ]);

        return request(app)
            .get('/api/v1/trips')
            .then(res => {
                trips.forEach(trip => {
                    expect(res.body).toContainEqual({
                        _id: trip._id.toString(),
                        name: trip.name,
                        location: trip.location
                    });
                });
            });
    });

    it('can get a single trip', async() => {
        const trip = await Trip.create({
            name: 'Beach Trip!',
            location: 'Manzanita, OR'
        });

        return request(app)
            .get(`/api/v1/trips/${trip._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Beach Trip!',
                    location: 'Manzanita, OR',
                    __v: 0
                });
            });
    });

    it('updates a trip by id', async() => {
        const trip = await Trip.create({
            name: 'Winter vaca',
            location: 'Portland, OR'
        });

        return request(app)
            .patch(`/api/v1/trips/${trip._id}`)
            .send({ name: 'I just live here...' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'I just live here...',
                    location: 'Portland, OR',
                    __v: 0
                });
            });
    });

    it('can delete a trip', async() => {
        const trip = await Trip.create({
            name: 'Canada Trip',
            location: 'Mexico!'
        });

        return request(app)
            .del(`/api/v1/trips/${trip._id}`)
            .then(res => {
                expect(res.body).toEqual([{
                    _id: expect.any(String),
                    name: 'Canada Trip',
                    location: 'Mexico!',
                    __v: 0
                },
                { deletedCount: 0, n: 0, ok: 1 }]);
            });
    });

});
