const socket = io();

socket.on('NEW_DATA', function (data) {
    console.log(data);
});