const {Pool} = require('pg')

const pool = new Pool({
    host: "localhost",
    user: "telemetry",
    port: 5432,
    password: "telemetry",
    database: "telemetry"
})

module.exports = { pool };
