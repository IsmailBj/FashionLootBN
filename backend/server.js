const express = require('express')
const mongoose = require('mongoose')
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

mongoose.connect('mongodb+srv://LootMan:l15zjuzMxXNOIIzU@clusterloot.kcvmtlr.mongodb.net/ProductsBox?retryWrites=true&w=majority', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    poolSize: 10,
    connectTimeoutMS: 30000
})
    .then(result => {
        app.listen(PORT, result)

    }).catch(err => console.log(err))
