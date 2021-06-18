const mongoose = require('mongoose');

const User = require('./User');

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017');
}

const models = { User };

module.exports = { models, connectDb };
