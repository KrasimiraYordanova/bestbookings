const mongoose = require('mongoose');

const connectionString = 'mongodb://127.0.0.1:27017/softuni-booking';

module.exports = async (app) => {
  try {
    await mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.log('Error initializing database');
    console.error(err.message);
    process.exit(1);
  }
};