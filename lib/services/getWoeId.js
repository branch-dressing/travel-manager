const superagent = require('superagent');

const getWoeId = (city) => {
    return superagent
        .get(`https://www.metaweather.com/api/location/search/?query=${city}`)
        .then(res => {
            const { woeid } = res.body[0];
            return woeid;
        });
};

module.exports = {
    getWoeId
};
