const express = require('express');
const { db } = require('./firebase-config');
require('dotenv/config');
const cors = require('cors');

const tasksRoutes = require('./taskRoutes/taskRoute');
const PORT = process.env.PORT;

const app = express();

app.use(cors());

app.use(express.json());

app.use('/tasks', tasksRoutes);


app.listen(PORT, (error) => {
  if (error) {
    return console.log('Error: ', error);
  }
  console.log('Server started on port '+PORT);
});