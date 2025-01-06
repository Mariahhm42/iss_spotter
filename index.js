// index.js
const { fetchISSFlyOverTimes } = require('./iss');

// Example coordinates (latitude and longitude)
const coords = { latitude: '49.27670', longitude: '-123.13000' };

fetchISSFlyOverTimes(coords, (error, data) => {
  if (error) {
    console.log("It didn't work! Error:", error);
    return;
  }

  console.log("It worked! ISS Flyover Times:", data);
});
