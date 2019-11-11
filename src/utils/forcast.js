const request = require('request')

// weather forcast with Darksky
const forcast = (latitude, longitude, callback) => {
    const KEY = '80d8ca72754b50cadef29d42c3ce1748'
    const location = `${latitude},${longitude}`
    const unit = 'si'
    const lang = 'en'
    const forcastURL = `https://api.darksky.net/forecast/${KEY}/${location}?units=${unit}&lang=${lang}`
    request({url: forcastURL, json: true}, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            const temperature = body.currently.temperature
            const precipProbability = body.currently.precipProbability
            const forcast = `${body.daily.data[0].summary}\nIt is currently ${temperature} degrees out.\nThere is a ${precipProbability}% chance of rain.`
            callback(undefined, forcast)
        }
    })
}

module.exports = forcast