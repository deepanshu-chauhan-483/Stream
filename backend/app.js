const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const logger = require('./utils/logger');

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(config.mongoURI)
    .then(() => logger.info('MongoDB connected'))
    .catch(err => logger.error(err));

// Routes
app.use('/api/users', require('./routes/user'));
app.use('/api/media', require('./routes/media'));

module.exports = app;
