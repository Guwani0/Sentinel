const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

// Body parser
app.use(express.json());

// Simple CORS middleware (allow all origins for dev)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
        return res.status(200).json({});
    }
    next();
});

// Mount API routes
const apiRoutes = require(path.join(__dirname, 'Routes', 'GRoutes'));
app.use('/api', apiRoutes);

// Root
app.get('/', (req, res) => res.send('Backend API is running.'));

// Connect to MongoDB and start server
const mongoUri = process.env.MONGO_URI || 'mongodb+srv://admin:XpXTg7Ug9g5wPdW9@ispm.5egix08.mongodb.net/';

mongoose
    .connect(mongoUri, { dbName: 'SentinelDB' })
    .then(() => console.log('Connected to MongoDB'))
    .then(() => {
        const port = process.env.PORT || 5000;
        app.listen(port, () => console.log(`Server listening on port ${port}`));
    })
    .catch((err) => console.error('Mongo connection error:', err));

