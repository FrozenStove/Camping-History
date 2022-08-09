const { Pool } = require('pg');

const PG_URI = 'postgres://tziqzswh:3wQcvJsAjwqsdF-RwyknAgyWf_-aHY5b@heffalump.db.elephantsql.com/tziqzswh';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
    query: (text, params, callback) => {
      console.log('executed query', text);
      return pool.query(text, params, callback);
    }
  };