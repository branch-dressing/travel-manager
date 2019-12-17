const { getWoeId } = require('../services/getWoeId');

module.exports = (req, res, next) => {
    const { location } = req.body;

    getWoeId(location)
        .then(woeId => {
            req.woeId = woeId;
            next();
        });
};
