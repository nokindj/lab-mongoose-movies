const mongoose = require('mongoose');
const Celebrity = require('../models/Celebrity.js');
const DB_NAME = 'celebrities-movies';
mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const celebrities = [
    {
        name: "Shaggy",
        occupation: "Musician",
        catchPhrase: "Bombastic"
    },
    {
        name: "Jamie Oliver",
        occupation: "Chef",
        catchPhrase: "keep it simple and delicious"
    },
    {
        name: "Dave Chapelle",
        occupation: "Standup Comedian",
        catchPhrase: "Im Rick James B*tch"
    }
];

Celebrity.create(celebrities)
    .then(celebritiesFromDB => {
        console.log(`Created ${celebritiesFromDB.length} celebrities`);
        mongoose.connection.close();
    })
    .catch(err => console.log(`An error occurred while creating celebrities from the DB: ${err}`));