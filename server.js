const express = require('express');
// const { Bme680 } = require('bme680-sensor');

const app = express();
const PORT = 5000;

// const bme680 = new Bme680(1, 0x77);

// let bmeData = [];

// bme680.initialize().then(async () => {
//     console.log('Bme680 Sensor initialized');
//     setInterval(async () => {
//         // console.log(await bme680.getSensorData());
//         bmeData.push(await bme680.getSensorData());
//     }, 3000);
// });

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/close', (rrq, res) => {
    res.send('closing...');
    var server = app.listen( PORT );
    server.close();
});

app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});