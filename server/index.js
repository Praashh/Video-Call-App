const express = require('express');
const { Server } = require('socket.io');
const bodyParser = require('body-parser');

const io = new Server({
    cors:true
});
const app = express();

app.use(bodyParser.json());

const emailToSocketMapping = new Map();
const socketIdToEmailMapping = new Map();

io.on("connection", (socket)=>{
    console.log("New Connection");
    socket.on('join-room', (data)=>{
        const {roomId, email} = data;
        console.log("User ", email, " joined ", roomId)
        emailToSocketMapping.set(email, socket.id);
        socketIdToEmailMapping.set(socket.id, email)
        socket.join(roomId);
        socket.emit('joined-room', roomId);
        socket.broadcast.to(roomId).emit('user-joined', email);
    });

    socket.on('call-user', data =>{
        const {email , offer} = data;
        const fromEmail = socketIdToEmailMapping.get(socket.id);
        const socketId = emailToSocketMapping.get(email);
        socket.to(socketId).emit('incoming-call', {from: fromEmail, offer});
    });

    socket.on('call-accepted', data =>{
        const {email, answer} = data;
        const socketId = emailToSocketMapping.get(email);
        socket.to(socketId).emit('call-accepted', {answer});
    })
})

app.listen(8000, ()=>{
    console.log("running on 8000");
})

io.listen(8001)

