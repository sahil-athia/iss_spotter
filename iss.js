const request = require('request');

const fetchMyIp = function(callback) {
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    } else if (response.statusCode !== 200) {
      const msg = `Status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    } else {
      const data = JSON.parse(body);
      callback(null, data);
    }
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    let final = {};
    final.longitude = data.longitude;
    final.latitude = data.latitude;
    callback(error, final);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coords: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body);
    callback(error, data.response);
  });
};


const nextISSTimesForMyLocation = function(callback) {
  fetchMyIp((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIp(ip.ip, (error, location) => {
      if (error) {
        console.log(error);
        return callback(error, null);
      }
      fetchISSFlyOverTimes(location, (error, flyOver) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, flyOver);
      });
    });
  });
  
};
// request(`https://ipvigilante.com/json/${ip}`, (error, response, body) => {  })

module.exports  = {
  nextISSTimesForMyLocation
};