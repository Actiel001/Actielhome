// import mysql from 'mysql2/promise';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'data',
// });

// export default connection;

const { Client } = require('pg');
require('dotenv').config();

// Ini dari folder .env kalian, isinya ada itu bisa dicari disupabase
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log('Connected to the database!'))
  .catch((err) => console.error('Database connection error:', err.stack));

module.exports = client;
