const { nextISSTimesForMyLocation } = require("./iss");

const times = function(passTimes) {
  for (let obj of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(obj.risetime);
    const duration = obj.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);

  }
};
nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    console.log('It didnt work!', error);
    return;
  }
  times(passTimes);
});

// fetchISSFlyOverTimes(coordsEx, (error, data) => {
//   if (error) {
//     console.log('It didnt work!', error);
//     return;
//   }
//   console.log('It worked! Returned fly times:\n', data);
// });

// fetchCoordsByIp('99.244.214.29', (error, data) => {
//   if (error) {
//     console.log('It didnt work!', error);
//     return;
//   }
//   console.log('it worked. Returned coords:', data);
// });

// fetchMyIp((error, ip) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log("It worked! Returned IP:", ip);
// });

//https://ipvigilante.com/8.8.8.8
