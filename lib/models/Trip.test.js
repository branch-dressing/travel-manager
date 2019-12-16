const Trip = require('./Trip');

describe('Trip model', () => {
    it('has a required name and thats all', () => {
        const trip = new Trip();
        const { errors } = trip.validateSync();

        expect(errors.name.message).toEqual('Path `name` is required.');
    });
});
