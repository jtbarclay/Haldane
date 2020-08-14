const express = require('express');
const { Bme680 } = require('bme680-sensor');

//web server setup
const app = express();
const PORT = 5000;
const bodyParser = require('body-parser');

//websocket setup
const http = require('http').createServer(app);
const io = require('socket.io')(http);

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

//sensor setup
const bme680 = new Bme680(1, 0x77);

let bmeData = [];

bme680.initialize().then(async () => {
    console.log('Bme680 Sensor initialized');
    setInterval(async () => {
        let newData = await bme680.getSensorData()
        bmeData = [...bmeData.slice(-9), newData];
        io.emit('NEW_DATA', bmeData);
    }, 3000);
});

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log('up and running on port', PORT);
});