var express = require('express');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

// routing
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// usernames which are currently connected to the chat
var usernames = {};

// rooms which are currently available in chat
var rooms = {};

io.sockets.on('connection', function (socket) {

    // when the client emits 'adduser', this listens and executes
    socket.on('adduser', function(username){
        // store the username in the socket session for this client
        socket.username = username;
        console.log(username);
        // add the client's username to the global list
        usernames[username] = '';

    });

    // when the client emits 'joinRoom', this listens and executes
    socket.on('joinRoom', function (roomCode) {

        if (usernames[socket.username] !== ''){
            const index = rooms[usernames[socket.username]]['users'].indexOf(socket.username);
            if (index > -1) {
                rooms[usernames[socket.username]]['users'].splice(index, 1);
            }

        }
        if (roomCode in rooms)  {
            rooms[roomCode]['users'].push(socket.username);
        }
        else {
            rooms[roomCode] = {"users":[socket.username]};
        }


        usernames[socket.username] = roomCode;
        socket.join(roomCode);
        socket.emit('updatechat', 'SERVER', 'you have connected to '+ roomCode);
        socket.emit('updaterooms', rooms, roomCode);

        // update socket session room title
        socket.room = roomCode;
        // socket.emit('updaterooms', rooms, roomCode);

        io.in(roomCode).emit('updateUsers', rooms[roomCode]["users"], socket.username);
        console.log(rooms);
        console.log(usernames);
    });

    // when the user disconnects.. perform this
    socket.on('disconnect', function(){
        // remove the username from global usernames list
        delete usernames[socket.username];
        // update list of users in chat, client-side
        //io.sockets.emit('updateusers', usernames);
        // echo globally that this client has left
        socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' has disconnected');
        socket.leave(socket.room);
    });
});

http.listen(port, () => {
    console.log(`Socket.IO server running at http://192.168.1.156:${port}/`);
});


//
// let locationCentre; // eg locationCentre.lat()
// let nearbyPlaces20; // 20 nearby restaurants. Refer to class to get any info
// let mainMap; // main google map
// let placeType = 'restaurant'; // type of places to look up nearby
//
// function initMap() {
//     mainMap = new google.maps.Map(document.getElementById("map"), {
//         zoom: 13,
//         center: { lat: -37.812745, lng: 144.960566 },
//     });
//     const geocoder = new google.maps.Geocoder();
//     document.getElementById("submit").addEventListener("click", () => {
//         markAndList(geocoder);
//     });
// }
//
// function markAndList(geocoder) {
//     // Function: Marks the location set by user and then lists nearby places
//     const address = document.getElementById("address").value;
//     geocoder.geocode({ address: address }, (results, status) => {
//         if (status === "OK") {
//             locationCentre = results[0].geometry.location;
//             mainMap.setCenter(locationCentre);
//             locationCentreMarker = new google.maps.Marker({
//                 map: mainMap,
//                 position: locationCentre,
//             });
//             nearbyPlaces20 = listNearby();
//         } else {
//             alert("Geocode was not successful for the following reason: " + status);
//         }
//     });
// }
//
// function listNearby() {
//     // Function: list 20 nearby restaurants, either based on sorted increasing distance or if in 5km radius
//     // Option 1: Use the following if you want to get some random 20 restaurants within the set radius
//     var request = {
//         location: locationCentre,
//         radius: '5000', // in metres
//         type: [placeType]
//     };
//
//     // // Option 2: Use the following if you want to get 20 nearest restaurants
//     // var request = {
//     //   location: locationCentre,
//     //   rankBy: google.maps.places.RankBy.DISTANCE,
//     //   type: ['restaurant']
//     // };
//
//     var nearbySearchService = new google.maps.places.PlacesService(mainMap);
//     return nearbySearchService.nearbySearch(request, callback);
// }
//
// function callback(results, status) {
//     // Function: returns results of nearby places
//     var listOfPlaces = [];
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//         console.log(results.length);
//         for (var i = 0; i < results.length; i++) {
//             listOfPlaces.push(new Venue(results[i]));
//             // console.log(listOfPlaces[i].name);
//             // console.log(haversine_distance(locationCentre, results[i].geometry.location));
//             // createMarker(results[i]); // mark the results
//         }
//         return listOfPlaces;
//     }
// }
//
// function createMarker(place) {
//     // Function: Draws a marker of the 'place' on the map
//     if (!place.geometry || !place.geometry.location) return;
//     const marker = new google.maps.Marker({
//         map,
//         position: place.geometry.location,
//     });
//     google.maps.event.addListener(marker, "click", () => {
//         infowindow.setContent(place.name || "");
//         infowindow.open(map);
//     });
// }
//
// function haversine_distance(mk1, mk2) {
//     // Function: Finds distance in miles LOL, src: https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
//     var R = 3958.8; // Radius of the Earth in miles
//     var rlat1 = mk1.lat() * (Math.PI/180); // Convert degrees to radians
//     var rlat2 = mk2.lat() * (Math.PI/180); // Convert degrees to radians
//     var difflat = rlat2-rlat1; // Radian difference (latitudes)
//     var difflon = (mk2.lng()-mk1.lng()) * (Math.PI/180); // Radian difference (longitudes)
//
//     var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
//     return d;
// }
//
// class Venue {
//     constructor(googlePlace) {
//         this.place = googlePlace;
//         this.name = this.getName();
//         this.location = this.getLocation();
//         this.rating = this.getRating();
//         this.img = this.getImgUrl();
//     }
//     getImgUrl() {
//         return this.place.photos[0].getUrl();
//     }
//     getName() {
//         return this.place.name;
//     }
//     getLocation() {
//         return this.place.geometry.location;
//     }
//     getRating() {
//         return this.place.rating;
//     }
// }