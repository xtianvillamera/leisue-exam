const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv/config');

const userRouter = require('./user/router');

const app = express();

app.use(bodyParser.urlencoded( {extended: true }));
app.use(bodyParser.json())

mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log('Database is connected successfully!')
)

app.use('/', userRouter);

app.listen(process.env.PORT, () => {
    console.log("Listening on port: " + process.env.PORT);
})