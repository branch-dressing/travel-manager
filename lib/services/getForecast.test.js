const { getForecast } = require('./getForecast');

describe('get weather', () => {
    it('can get the weather', async() => {
        const date = new Date('2019-12-20');
        const weather = await getForecast(44418, date);
        expect(weather).toEqual('Light Rain');
    });
});