const request = require('request-promise-native');

const fetchMyIp = function() {
  return request(`https://api.ipify.org/?format=json`);
};
const fetchCoordsByIP = function(body) {
  let ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`);
};
const fetchFlyOverTimes = function(data) {
  let coords = JSON.parse(data);
  let final = {};
  final.longitude = coords.longitude;
  final.latitude = coords.latitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${final.latitude}&lon=${final.longitude}`);
};


const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchFlyOverTimes)
    .then((body) => {
      let data = JSON.parse(body);
      return (data.response);
    });
};
module.exports = { nextISSTimesForMyLocation };