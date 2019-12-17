const superagent = require('superagent');

const getForecast = (woeId, date) => {
    const yyyyMmDd = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    
    return superagent
        .get(`https://www.metaweather.com/api/location/${woeId}`)
        .then(res => {
            const weatherArray = JSON.parse(res.text).consolidated_weather;
            return weatherArray.reduce((acc, element) => {
                if(element.applicable_date === yyyyMmDd) {
                    return element.weather_state_name;
                }
                return acc;
            }, '');
        });
};

module.exports = {
    getForecast
};
