require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Trip = require('../lib/models/Trip');
const ItineraryItem = require('../lib/models/ItineraryItem');

describe('itinerary routes', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('creates an itinerary item with the weather', async() => {
        const date = new Date('December 17, 2019 03:24:00');
        const trip = await Trip.create({ name: 'First trip', location: 'Portland' });
        return request(app)
            .post('/api/v1/itineraryitems')
            .send({
                tripId: trip._id,
                name: 'see that one thing',
                date: date
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'see that one thing',
                    tripId: trip._id.toString(),
                    date: date.toISOString(),
                    forecast: 'string',
                    __v: 0
                });
            });
    });
});
