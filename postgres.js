const Pool = require('pg').Pool

const dbConfig = {
    connectionString: 'postgresql://localhost:5432/calendrit',
}

if(process.env.DATABASE_URL){
    dbConfig.ssl = {rejectUnauthorized: false}
    dbConfig.connectionString = process.env.DATABASE_URL
}

const pool = new Pool(dbConfig)

module.exports = pool;
