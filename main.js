const express = require('express');
const app = express();
const http = require("http");
const path = require('path');
const port = 3030;
// Setting up socket.io
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);
    socket.on("send-location",(data)=>{
        console.log("Receive Location: ",data);
        io.emit("receive-location",{id:socket.id,...data}); //spred operator
    });
    socket.on("disconnect",()=>{
        io.emit("user-disconnected",socket.id);
    })
});

app.get('/',(req,res)=>{
    res.render("index");
});

server.listen(port,()=>{
    console.log("Server started on port 3030");
});