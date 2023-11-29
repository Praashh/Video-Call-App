const express = require('express');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const io = new Server();
const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();

io.on("connection", (socket)=>{
    socket.on('join-room', (data)=>{
        const {roomId, email} = data;
        console.log("User ", email, " joined ", roomId)
        emailToSocketMapping.set(email, socket.id);
        socket.join(roomId);
        socket.broadcast.to(roomId).emit('user-joined', {email});
    })
})

app.listen(8000, ()=>{
    console.log("running on 3000");
})

io.listen(8001)

