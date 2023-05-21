const { pool } = require("./db");

async function insertData() {
  const [locationID, locationAddress, currentTemp] = process.argv.slice(2);
  try {
  const res = await pool.query(
      "INSERT INTO measured_data (locationID, locationAddress,currentTemp) VALUES ($1, $2, $3)",
      [locationID, locationAddress, currentTemp]
    );
  console.log(`Added a data point. LocationId: ${locationID}, locationAddress: ${locationAddress}, currentTemp: ${locationID}`);
  } catch (error) {
    console.error(error)
  }
}

insertData();

