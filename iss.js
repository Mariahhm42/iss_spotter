// iss.js
const needle = require('needle');

/**
 * Fetch the geographical coordinates (latitude and longitude) for a given IP address.
 * Input:
 *   - IP address (string)
 *   - Callback (function)
 * Returns (via Callback):
 *   - Error, if any (nullable)
 *   - Latitude and Longitude as an object: { latitude: 'value', longitude: 'value' }
 */
const fetchCoordsByIP = function(ip, callback) {
  const url = `https://ipwho.is/${ip}`;
  
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      callback(Error("Failed to parse response body"), null);
      return;
    }

    // Error handling: check for 'success' flag in the response
    if (!data.success) {
      callback(Error(`Success status was false. Server message says: ${data.message} when fetching for IP ${ip}`), null);
      return;
    }

    // If everything is okay, return the latitude and longitude
    const { latitude, longitude } = data;
    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchCoordsByIP };
