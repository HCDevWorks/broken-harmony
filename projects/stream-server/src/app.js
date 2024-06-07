const express = require('express');
const cors = require('cors');
const streamRoutes = require('../routes/streamRoutes');
const streamController = require('../controllers/streamController');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', streamRoutes);

streamController.startInitialStreaming();

module.exports = app;