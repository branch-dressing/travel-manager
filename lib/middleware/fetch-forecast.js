const { getForecast } = require('../services/getForecast');

module.exports = (req, res, next) => {
    const { date } = req.body;

    //I need to find the Trip
    //const { tripId } = req.body:
    //call findById for the trip
    //take the woeId from that
    //const woeId = trip.woeId???

    getForecast(/*woeId*/date)
        .then(woeId => {
            req.woeId = woeId;
            next();
        });
};