'use strict';

const mongoose = require('mongoose');

require("dotenv").config();
mongoose.connect(process.env.MONGODB_URI);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Connected to the ${process.env.MONGODB_URI} database`);
});
