const needle = require('needle');

/**
 * Makes a single API request to retrieve upcoming ISS fly over times for the given lat/lng coordinates.
 * Input:
 *   - An object with keys `latitude` and `longitude`
 *   - A callback (to pass back an error or the array of resulting data)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly over times as an array of objects (null if error). Example:
 *     [ { risetime: 134564234, duration: 600 }, ... ]
 */
const fetchISSFlyOverTimes = function(coords, callback) {
  const { latitude, longitude } = coords;
  
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;

  // Make the API request to get the flyover times
  needle.get(url, (error, response, body) => {
    if (error) {
      callback(error, null);  // Pass the error to the callback
      return;
    }

    // Check if the response status code is 200 (OK)
    if (response.statusCode !== 200) {
      callback(`Error: Status code ${response.statusCode}`, null);
      return;
    }

    // Parse the response body
    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      callback('Error parsing response body', null);
      return;
    }

    // Check if the API response is successful
    if (data.message !== "success") {
      callback(`Error: ${data.message}`, null);
      return;
    }

    // Pass the array of flyover times to the callback
    callback(null, data.response);
  });
};

module.exports = { fetchISSFlyOverTimes };
