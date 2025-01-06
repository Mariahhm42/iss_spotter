// index.js

const { nextISSTimesForMyLocation } = require('./iss');

// Call the function to get the next ISS flyovers for the current location
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  // Success! Print out the flyover times.
  passTimes.forEach(pass => console.log(pass));
});
