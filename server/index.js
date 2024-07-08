const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const cors = require('cors');
const cron = require('node-cron');

const registeringNumbersMap = new Map();
app.use(express.json());
app.use(cors()); // This enables CORS
// Schedule the task to run at 00:00 every day
cron.schedule('0 0 * * *', () => {
  // Clear the registering number map
  registeringNumbersMap.clear();
  console.log('Registering numbers cleared for the day.');
});

// Open SQLite database

function convertStrToDate(dateString){
  const year = dateString.substring(0, 4);
  const month = dateString.substring(4, 6);
  const day = dateString.substring(6, 8);

  return new Date(year, month - 1, day);
}
let db = new sqlite3.Database('./mydb.sqlite3', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the mydb sqlite database.');

  // Create table if not exists
  db.run(`CREATE TABLE IF NOT EXISTS transfers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    OriginalAddress text,
    targetAddress text,
    hexadecimal_amount text,
    success integer,
    transferTime DATE,
    txhash text
  )`);
});

// Endpoint to save transfer
app.post('/save-transfer', (req, res) => {
  const { OriginalAddress, targetAddress, hexadecimal_amount, success, txhash } = req.body;
    const transferTime = new Date();
  db.run(`INSERT INTO transfers (OriginalAddress, targetAddress, hexadecimal_amount, success, transferTime, txhash) VALUES (?, ?, ?, ?, ?, ?)`, [OriginalAddress, targetAddress, hexadecimal_amount, success, transferTime, txhash], function(err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ id: this.lastID });
  });
});

const PORT = process.env.TCHAIN_DATABASE_PORT || 8082;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Endpoint to fetch today's transfers
app.post('/fetch-today-transfers', (req, res) => {
  const { originalAddress } = req.body;

  // db.all("SELECT * FROM transfers WHERE DATE(transferTime) = DATE('now') AND originalAddress = ?", [originalAddress], (err, rows) => {
  //   if (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  //   res.json(rows);
  // });
  let today = new Date();
  today.setHours(0, 0, 0, 0); // set the time to 00:00:00

  let tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1); // get the date of tomorrow
  console.log(today, tomorrow);
  db.all("SELECT * FROM transfers WHERE originalAddress = ? AND transferTime >= ? AND transferTime < ?", [originalAddress, today, tomorrow], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
  // db.all("SELECT * FROM transfers WHERE originalAddress = ? ", [originalAddress], (err, rows) => {
  //   if (err) {
  //     return res.status(500).json({ error: err.message });
  //   }
  //   res.json(rows);
  // });
});

// Endpoint to fetch this month's transfers
app.post('/fetch-month-transfers', (req, res) => {
  const { originalAddress } = req.body;

  let now = new Date();
  let start = new Date(now.getFullYear(), now.getMonth(), 1); // set the date to the first day of the current month
  let end = new Date(now.getFullYear(), now.getMonth() + 1, 1); // set the date to the first day of the next month

  db.all("SELECT * FROM transfers WHERE originalAddress = ? AND transferTime >= ? AND transferTime < ?", [originalAddress, start, end], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

// Endpoint to fetch transfers for a specific time slot
app.post('/fetch-slot-transfers', (req, res) => {
  const { startDate, endDate, originalAddress } = req.body;
  // console.log('startDate', startDate, 'endDate', endDate)
  const RealstartDate = convertStrToDate(startDate);
  const RealendDate = convertStrToDate(endDate);

  db.all('SELECT * FROM transfers WHERE transferTime BETWEEN ? AND ? AND originalAddress = ?', [RealstartDate, RealendDate, originalAddress], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

app.get('/check_registering_number_day', (req, res) => {
  try {
    const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    // Check if the IP address exists in the registering number map
    if (registeringNumbersMap.has(ipAddress)) {
      let registeringNumber = registeringNumbersMap.get(ipAddress);

      // Check if the registering number is greater than or equal to 10
      if (registeringNumber >= 10) {
        res.status(200).json({ registeringNumber: -1 });
      } else {
        registeringNumber++; // Increment the registering number
        registeringNumbersMap.set(ipAddress, registeringNumber); // Update the map with the incremented value
        res.status(200).json({ registeringNumber: 10 - registeringNumber });
      }
    } else {
      // If the IP address doesn't exist, create the key and set the registering number to 1
      registeringNumbersMap.set(ipAddress, 1);
      res.status(200).json({ registeringNumber: 9 });
    }
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});