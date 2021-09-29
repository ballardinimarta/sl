const express = require('express');
const axios = require('axios');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  next();
});

app.get('/stops/:lat/:long',async (req, res, next) => {
    const lat = req.params.lat
    const long = req.params.long
    try {
        const response = await axios.get(`https://api.sl.se/api2/nearbystopsv2.json?key=e1ff55a7b7024f64832e834566773c6e&originCoordLat=${lat}&originCoordLong=${long}&maxNo=5`)
        console.log(response.data)
        res.json(response.data)
    }
    catch (err) {
        console.log(err)
    }
});

app.get('/stop/:name', async (req, res) => {
    const name = req.params.name
    try {
        const response = await axios.get(`https://api.sl.se/api2/typeahead.json?key=af6c93f932084ff68c9c95ded0ea2502&searchstring=${name}&stationsonly=true&maxresults=1`)
        console.log(response)
        res.json(response.data)
    }
    catch (err) {
        console.log(err)
    }
})

app.get('/departures/:siteid', async (req, res) => {
    const siteid = req.params.siteid
    
    try {
        const response = await axios.get(`https://api.sl.se/api2/realtimedeparturesV4.json?key=1e61e491159543eb8f4c61d8046164e4&siteid=${siteid}&timewindow=15`)
        console.log(response)
        res.json(response.data)
    }
    catch (err) {
        console.log(err)
    }
})

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));