const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
require('dotenv').config();
const app = express()
const PORT = process.env.PORT;

const boxesRoute = require('./routes/boxes')
const itemsRoute = require('./routes/items')
const AuthUser = require('./routes/auth')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/boxes', boxesRoute)
app.use('/api/items', itemsRoute)
app.use('/api/user', AuthUser)

mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    poolSize: 10,
    connectTimeoutMS: 30000
}).then(result => {
    app.listen(PORT, result)
    console.log('Server running on PORT ' + PORT)
}).catch(err => console.log(err))



// TODO https://chat.openai.com/c/efb9961a-8c51-4c7a-9222-4b439f606834