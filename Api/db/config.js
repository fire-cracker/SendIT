import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connection = '';

if (process.env.NODE_ENV === 'development') {
  connection = process.env.DATABASE_DEV;
}

if (process.env.NODE_ENV === 'test') {
  connection = process.env.DATABASE_TEST;
}

if (process.env.NODE_ENV === 'production') {
  connection = process.env.DATABASE_URL;
}
const pool = new Pool({
  connectionString: connection
  || process.env.DATABASE_TEST
  || process.env.DATABASE_DEV
  || process.env.DATABASE_URL
});


export default {
/**
 * Database Query
 * @param {*} text - query text
 * @param {*} params - values required by text
 */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        });
    });
  },
};
