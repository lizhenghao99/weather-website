const request = require('request')

// geocoding with Mapbox
const geocode = (address, callback) => {
    const TOKEN = 'pk.eyJ1IjoibGl6aGVuZ2hhbzk5IiwiYSI6ImNrMmxoam5iZDA3OXkzY205cWh4dTFjdzIifQ.xAsIhSJ5uRouBuwsrbcxaQ'
    const limit = '1'
    const geoURL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=${TOKEN}&limit=${limit}`
    request({url: geoURL, json: true}, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to geocoding service', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try a different search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0], 
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode