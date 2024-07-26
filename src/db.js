const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'portfolio_tracker',
    password: 'root', // Update with your PostgreSQL password
    port: 5432,
});

module.exports = pool;