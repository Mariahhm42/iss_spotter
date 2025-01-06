// index.js
const { fetchCoordsByIP } = require('./iss');

const ip = "162.245.144.188";

fetchCoordsByIP(ip, (error, data) => {
  if (error) {
    console.log("It didn't work! Error:", error);
    return;
  }

  console.log("It worked! Latitude and Longitude:", data);
});
