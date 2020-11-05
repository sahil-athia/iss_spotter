const {nextISSTimesForMyLocation} = require('./iss_promised');
const times = function(passTimes) {
  for (let obj of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(obj.risetime);
    const duration = obj.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};
nextISSTimesForMyLocation()
  .then((passTimes) => {
    times(passTimes);
  })
  .catch((error) => {
    console.log('It didnt work!', error);
    return;
  });