const express = require('express')
const mongoConnect = require('./utils/database').mongoConnect
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 3000

const boxRoutes = require('./routes/boxes')
app.use(cors());
app.use('/api/boxes', boxRoutes)

mongoConnect(() => {
    app.listen(PORT, () => {
        console.log('server running on PORT: ', PORT)
    });
})
