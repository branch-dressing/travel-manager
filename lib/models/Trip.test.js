const Trip = require('./Trip');

describe('Trip model', () => {
    it('has a required name and thats all', () => {
        const trip = new Trip();
        const { errors } = trip.validateSync();

        expect(errors.name.message).toEqual('Path `name` is required.');
        expect(errors.location.message).toEqual('Path `location` is required.');

        const trip2 = new Trip({
            name: 'My Trip',
            location: 'Portland, OR'
        });

        expect(trip2.toJSON()).toEqual({
            _id: trip2._id,
            name: 'My Trip',
            location: 'Portland, OR'
        });
    });
});
