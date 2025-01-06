const { fetchCoordsByIP } = require('./geocode');
const { fetchISSFlyOverTimes } = require('./iss');

/**
 * Orchestrates multiple API requests in order to determine the next 5 upcoming ISS fly overs for the user's current location.
 * Input:
 *   - A callback with an error or results. 
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The fly-over times as an array (null if error):
 *     [ { risetime: <number>, duration: <number> }, ... ]
 */ 
const nextISSTimesForMyLocation = function(callback) {
  // Step 1: Fetch the coordinates for the user's IP
  fetchCoordsByIP((error, coords) => {
    if (error) {
      return callback(error, null); // Return if there is an error
    }
    
    // Step 2: Fetch the ISS flyover times for these coordinates
    fetchISSFlyOverTimes(coords, (error, passTimes) => {
      if (error) {
        return callback(error, null); // Return if there is an error
      }
      
      // Step 3: Successfully fetched flyover times, format and return them
      const formattedPassTimes = passTimes.map(pass => {
        const date = new Date(0); // Create a new date object
        date.setUTCSeconds(pass.risetime); // Set the date to the correct flyover time
        return `Next pass at ${date} for ${pass.duration} seconds!`;
      });
      
      // Pass the formatted times to the callback
      callback(null, formattedPassTimes);
    });
  });
};

module.exports = { nextISSTimesForMyLocation };
