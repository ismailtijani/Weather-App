// Imported Modules
const request = require("request");

const geoCode = (address, callBack) => {
  const url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
    address
  )}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callBack("Unable to connect to location Services!", undefined);
    } else if (body.message) {
      callBack(
        `${body.status} Error. Unable to find location. Try another search`,
        undefined
      );
    } else {
      callBack(undefined, {
        latitude: body[0].latlng[0],
        longitude: body[0].latlng[1],
        location: body[0].name.common,
      });
    }
  });
};

//   Exported API's
module.exports = geoCode;
