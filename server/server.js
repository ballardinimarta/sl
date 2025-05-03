const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../build"));
});

app.get("/api/stops/:lat/:long", async (req, res, next) => {
  const lat = req.params.lat;
  const long = req.params.long;
  try {
    const response = await axios.get(
      `https://journeyplanner.integration.sl.se/v1/nearbystopsv2.json?key=TRAFIKLAB-SLAPI-INTEGRATION-2024&originCoordLat=${lat}&originCoordLong=${long}&maxNo=5&r=1000&stationsonly=true`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/stop/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(
      `https://journeyplanner.integration.sl.se/v1/typeahead.json?key=TRAFIKLAB-SLAPI-INTEGRATION-2024&searchstring=${name}&stationsonly=true`
    );
    console.log(response);
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/departures/:siteid", async (req, res) => {
  const siteid = req.params.siteid;

  try {
    const response = await axios.get(
      `https://transport.integration.sl.se/v1/sites/${siteid}/departures`
    );
    console.log(response);
    res.json(response.data);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));
