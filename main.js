const { Socket } = require('dgram');
const express = require('express');
const app = express();
const https = require("http");
const path = require('path');

// Setting up socket.io
const io = require("socket.io");

const server = https.createServer(app);

const io = socketio(server);


app.set("view engine","ejs");
app.set(express.static(path.join(__dirname,"public")));

app.get('/',(req,res)=>{
    res.send("Server started");
});

server.listen(3030,()=>{
    console.log("Server started on port 3030");
});