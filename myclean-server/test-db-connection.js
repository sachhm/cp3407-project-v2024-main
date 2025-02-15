// filepath: /Users/samo/Documents/cp3407-project-v2024-main/myclean-server/test-db-connection.js
const pool = require('./config');

(async () => {
  try {
    const client = await pool.connect();
    console.log('Connected to the database');
    client.release();
  } catch (err) {
    console.error('Error connecting to the database', err);
  }
})();