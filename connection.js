'use strict';

const { Client } = require('pg');

const isProduction = process.env.NODE_ENV === 'Production';

const client = new Client({
  connectionString: isProduction
    ? process.env.DATABASE_PROD
    : process.env.DATABASE_DEV,
  ssl: { rejectUnauthorized: false },
});

module.exports = client;
