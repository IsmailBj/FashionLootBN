const express = require('express')
const mongoConnect = require('./utils/database').mongoConnect
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3000;

const boxesRoute = require('./routes/boxes')
const itemsRoute = require('./routes/items')
const AuthUser = require('./routes/auth')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/boxes', boxesRoute)
app.use('/api/items', itemsRoute)
app.use('/api/user', AuthUser)
mongoConnect(() => {
    app.listen(3000, () => {
        console.log('server running on PORT: ', `:${PORT}`)
    });
})
