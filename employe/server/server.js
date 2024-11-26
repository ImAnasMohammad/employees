const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')

require('dotenv').config();


const app = express();

app.use(cors());

app.use(bodyParser.json());

const MONGO_URI = process.env.DB_URI || 'mongodb://localhost:27017/employee';

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });


const employee = require("./routes/employees");
const auth = require('./routes/auth');
const upload = require('./routes/upload')

app.use('/employee',employee)
app.use('/auth',auth);
app.use('/upload',upload);



app.listen({port:8080});