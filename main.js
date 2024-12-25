const express = require('express');
const app = express();
const http = require("http");
const path = require('path');

// Setting up socket.io
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

io.on("Connection",(socket)=>{
    console.log("a user connected");
});

app.get('/',(req,res)=>{
    res.render("index");
});

server.listen(3030,()=>{
    console.log("Server started on port 3030");
});