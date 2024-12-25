
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

const map = L.map("map").setView([0, 0], 16);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "OpenStreetMap",
}).addTo(map);

const markers = {}; //empty object markers
socket.on("receive-location",(data)=>{
    console.log("location reveived",data);
    const {id,latitude,longitude} = data;

    map.setView([latitude,longitude]);
    if(markers[id]){
        markers[id].setLatLng([latitude, longitude]);
    }else{
        markers[id] = L.marker([latitude,longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});


// socket.on("user-disconnect", (id) => {
//     if (markers[id]) {
//         map.removeLayer(markers[id]);
//         delete markers[id];
//     }
// });


// socket.on("user-disconnect",(id)=>{
//     if(markers[id]){
//         map.removeLayer(markers[id])
//         delete markers[id];
//     }
// });