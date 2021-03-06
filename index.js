let locationCentre; // eg locationCentre.lat()
let nearbyPlaces20; // 20 nearby restaurants. Refer to class to get any info
let mainMap; // main google map
let placeType = 'restaurant'; // type of places to look up nearby

function initMap() {
  mainMap = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: -37.812745, lng: 144.960566 },
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    markAndList(geocoder);
  });
}

function markAndList(geocoder) {
  // Function: Marks the location set by user and then lists nearby places
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      locationCentre = results[0].geometry.location;
      mainMap.setCenter(locationCentre);
      locationCentreMarker = new google.maps.Marker({
        map: mainMap,
        position: locationCentre,
      });
      nearbyPlaces20 = listNearby();
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function listNearby() {
  // Function: list 20 nearby restaurants, either based on sorted increasing distance or if in 5km radius
  // Option 1: Use the following if you want to get some random 20 restaurants within the set radius
  var request = {
    location: locationCentre,
    radius: '5000', // in metres
    type: [placeType]
  };

  // // Option 2: Use the following if you want to get 20 nearest restaurants
  // var request = {
  //   location: locationCentre,
  //   rankBy: google.maps.places.RankBy.DISTANCE,
  //   type: ['restaurant']
  // };

  var nearbySearchService = new google.maps.places.PlacesService(mainMap);
  return nearbySearchService.nearbySearch(request, callback);
}

function callback(results, status) {
  // Function: returns results of nearby places
  var listOfPlaces = [];
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (var i = 0; i < results.length; i++) {
      listOfPlaces.push(new Venue(results[i]));
      // console.log(listOfPlaces[i].name);
      // console.log(haversine_distance(locationCentre, results[i].geometry.location));
      // createMarker(results[i]); // mark the results
    }
    console.log(listOfPlaces)
    return listOfPlaces;
  }
}

function createMarker(place) {
  // Function: Draws a marker of the 'place' on the map
  if (!place.geometry || !place.geometry.location) return;
  const marker = new google.maps.Marker({
    map,
    position: place.geometry.location,
  });
  google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

function haversine_distance(mk1, mk2) {
  // Function: Finds distance in miles LOL, src: https://cloud.google.com/blog/products/maps-platform/how-calculate-distances-map-maps-javascript-api
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng()-mk1.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}

class Venue {
  constructor(googlePlace) {
    this.place = googlePlace;
    this.name = this.getName();
    this.location = this.getLocation();
    this.rating = this.getRating();
    this.img = this.getImgUrl();
  }
  getImgUrl() {
    return this.place.photos[0].getUrl();
  }
  getName() {
    return this.place.name;
  }
  getLocation() {
    return this.place.geometry.location;
  }
  getRating() {
    return this.place.rating;
  }
}