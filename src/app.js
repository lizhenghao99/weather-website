const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast')


const app = express()
const port = process.env.PORT || 3000

// paths for express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// handlebar setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// static setup
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Lotus Weather',
        name: 'Zhenghao Li'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Zhenghao Li'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        content: 'This is some helpful text.', 
        name: 'Zhenghao Li'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if (error) {
            return res.send({error})
        }
        forcast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({error})
            }
            res.send({
                forcast: data,
                location: location
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Zhenghao Li', 
        message: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404', 
        name: 'Zhenghao Li', 
        message: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})