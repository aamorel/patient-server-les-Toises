var sqlite3 = require('sqlite3');

let db = new sqlite3.Database('patient_data.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the SQlite database.');
});

