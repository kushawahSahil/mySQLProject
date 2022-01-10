const express = require('express');
var app = express();
const bodyParser = require('body-parser');

const cookie = require('cookie-parser');


const db = require('./app/dbConnection/db');
const dotenv = require('dotenv');
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookie());
app.use('/', require('./app/router/routes/route'));

app.use(express.static('app/upload'));

app.listen('5000', () => {
    console.log('server started on port 5000...');
})

