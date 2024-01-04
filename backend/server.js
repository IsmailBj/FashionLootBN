const express = require('express')
const mongoConnect = require('./utils/database').mongoConnect
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3000

const boxesRoute = require('./routes/boxes')
const itemsRoute = require('./routes/items')

app.use(cors());
app.use('/api/boxes', boxesRoute)
app.use('/api/items', itemsRoute)
mongoConnect(() => {
    app.listen(PORT, () => {
        console.log('server running on PORT: ', PORT)
    });
})
