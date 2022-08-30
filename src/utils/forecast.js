// Importing Modules
const request = require("request");

const forecast = (latitude, longitude, callBack) => {
  const url = `http://api.weatherstack.com/current?access_key=d130abbd5eda955c6a5212f83a7e8326&query=${latitude},${longitude}&units=m`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callBack("Unable to find Location. Try another search", undefined);
    } else {
      callBack(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. There is ${body.current.feelslike}% chance of rain.`
      );
    }
  });
};

// Exporting API's
module.exports = forecast;
