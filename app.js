/* eslint-disable no-console */
const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cors = require('cors')

const app = express()
const server = require('http').createServer(app)

app.use(
    bodyParser.urlencoded({
        extended: false,
    }),
)
app.use(
    bodyParser.json({
        limit: '2mb',
        extended: true,
    }),
)
app.use(
    bodyParser.raw({
        type: 'application/octet-stream',
        limit: '5mb',
    }),
)
app.use(
    bodyParser.raw({
        type: 'image/*',
        limit: '5mb',
    }),
)

// use morgan to log requests to the console
app.use(morgan('dev'))
app.use(cors())

server.listen(process.env.PORT || 3000)
console.warn('processId:' + process.pid + ' App Running...')
