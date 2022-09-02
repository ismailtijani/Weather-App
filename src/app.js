const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//Define path for Express config
const publicAdress = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup static directory to serve
app.use(express.static(publicAdress));

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//app.com
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Tijani Ismail",
  });
});

//app.about
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tijani Ismail",
  });
});

//app.help
app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "This is some helpful Text",
    title: "Help",
    name: "Tijani Ismail",
  });
});

//weather page
app.get("/weather-page", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  const address = req.query.search;
  geoCode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        forecast: forecastData,
        location: location,
        address: req.query.search,
      });
    });
  });
});

//Wrong sub-route
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Tijani Ismail",
    errorMessage: "Help page article not found",
  });
});

//Wrong route
app.get("/*", (req, res) => {
  res.render("404", {
    title: "404 Error",
    name: "Tijani Ismail",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is Up on port ${port}`);
});
