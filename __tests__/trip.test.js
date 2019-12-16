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
                location: 'Portland, OR'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'My first Trip',
                    location: 'Portland, OR',
                    __v: 0
                });
            });
    });
});
