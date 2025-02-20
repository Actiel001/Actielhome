// import mysql from 'mysql2/promise';

// const connection = await mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'data',
// });

// export default connection;

import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

// ini dari file .env kalian, dan jika kalian mau up di github jangan lupa diprivasi☺
const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

client.connect()
  .then(() => console.log("Connected to the database!"))
  .catch((err) => console.error("Database connection error:", err.stack));

export default client;
