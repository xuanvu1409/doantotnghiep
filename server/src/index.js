require('dotenv').config();
// Express framework
const express = require('express');
const app = express();

//Express api
app.use(express.json());

// DEBUG
const morgan = require('morgan');
app.use(morgan('combined'));

// Connect Database
const db = require('./config/DB');
db.connect();

// Enable cors
const cors = require('cors');
app.use(cors());

// Import route
const route = require('./routes/api');
route(app);

const socketIO = require('./config/socketIO');
socketIO(app);

// Path default
const path = require('path')
app.use(express.static(path.join(__dirname, 'public')))

// app.listen(process.env.APP_PORT, () => console.log(`App listening at http://localhost:${process.env.APP_PORT}`))
