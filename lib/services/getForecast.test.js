const { getWeather } = require('./getForecast');

describe('get weather', () => {
    it('can get the weather', async() => {
        const date = new Date('2019-12-20');
        const weather = await getWeather(44418, date);
        expect(weather).toEqual('Heavy Rain');
    });
});