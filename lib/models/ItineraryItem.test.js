const ItineraryItem = require('./ItineraryItem');
const Trip = require('./Trip');

describe('itinerary model', () => {
    it('has a required name, date, and tripId', () => {
        const iItem1 = new ItineraryItem();
        const { errors } = iItem1.validateSync();

        expect(errors.name.message).toEqual('Path `name` is required.');
        expect(errors.date.message).toEqual('Path `date` is required.');
        expect(errors.tripId.message).toEqual('Path `tripId` is required.');

    });
    it('has required fields', () => {
        const date = new Date;
        const trip = new Trip({ name: 'my trip' });
        const iItem2 = new ItineraryItem({
            name: 'Do the thing',
            date: date,
            tripId: trip._id
        });

        expect(iItem2.toJSON()).toEqual({
            _id: iItem2._id,
            name: 'Do the thing',
            date: date,
            tripId: trip._id
        });
    });
});
