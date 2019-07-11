const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

const headlines = require('./routes/api/headlines');
const updates = require('./routes/api/updates');
const featuredAds = require('./routes/api/featuredAds');
const greetings = require('./routes/api/greetings');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// DB Config
const db = config.get('mongoURI');

// Connect to Mongo
mongoose
    .connect(db, {
        useNewUrlParser:true,
        useCreateIndex: true
    })
    .then( () => console.log('MongoDB Connected...'))
    .catch( err => console.log(err));


// Use Routes
app.use('/api/headlines', headlines);
app.use('/api/updates', updates);
app.use('/api/featuredAds', featuredAds);
app.use('/api/greetings', greetings);
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));

