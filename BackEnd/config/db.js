const mysql = require('mysql2/promise');
// dotenv.config({ path: './.env' });
const mySqlPool = mysql.createPool({
  host: '127.0.0.1',     // safer than 'localhost'
  port: 3000,            // <<<<<<<<<< IMPORTANT
  user: 'root',
  password: 'Ashish12345@@',   
  database: 'nbk'
});

module.exports = mySqlPool;
