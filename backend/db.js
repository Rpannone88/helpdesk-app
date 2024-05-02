const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false 
    }
});
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('Error testing the database connection', err.stack);
    } else {
      console.log('Database connection time:', res.rows[0]);
    }
  });
pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
  })

module.exports = pool;
