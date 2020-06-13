const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

if (process.env.NODE_ENV !== 'production') require('dotenv').config()

const {PORT, CLOUD_MONGODB, NODE_ENV} = process.env
const mongoUri = NODE_ENV === 'production' ? `mongodb://db:27017/db` : CLOUD_MONGODB

console.log('MONGO_URI: ', mongoUri)
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

