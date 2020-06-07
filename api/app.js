const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const dev = process.env.NODE_ENV !== 'production'
if (dev) require('dotenv').config()
const {PORT, DB_NAME, DB_URL} = process.env
const mongoUri = `mongodb${dev ? '+srv' : ''}://${DB_NAME}/${DB_URL}`
const app = express()

app.use(bodyParser.json())
app.use('/t', require('./routes/redirect.routes'))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.get('/api/ping', (req, res) => res.sendStatus(204))


async function start() {
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(`Mongo error: ${e.message}`)
        process.exit(1)
    }
}

start()

