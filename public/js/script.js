
// const socket = io();

// // Checking if the browser supports geolocation
// if(navigator.geolocation){
//     // Getting the user's current location
//     navigator.geolocation.watchPosition((position)=>{
//         const {latitude,longitude}  =position.coords;
//         socket.emit("send-location",{latitude,longitude});
//     },(error)=>{
//         console.error(error);
//     },{
//         enableHighAccuracy:true,
//         timeout:5000,
//         maximumAge:0
//     }
// );
// }
// const map = L.map("map").setView([0,0],10);

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
//     attribution: "OpeStreetMap"
// }).addTo(map)

const socket = io();

// Checking if the browser supports geolocation
if (navigator.geolocation) {
    // Getting the user's current location
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.error(error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 10);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap",
}).addTo(map);