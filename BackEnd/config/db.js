const mysql = require('mysql2/promise');
// dotenv.config({ path: './.env' });
const mySqlPool = mysql.createPool({
  host: 'localhost',     // safer than 'localhost'
  port: 3306,            // <<<<<<<<<< IMPORTANT
  user: 'root',
  password: 'abiral',   
  database: 'nbk'
});

module.exports = mySqlPool;
