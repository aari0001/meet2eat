let nearbyPlaces20; // 20 nearby restaurants. Refer to class to get any info
let placeType = 'restaurant'; // type of places to look up nearby
let searchInput = 'Monash University';

function initMap() {
  var mainMap = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: -37.812745, lng: 144.960566 },
  });
  listNearby(searchInput);
}

function listNearby(address) {
  var locationCentre; // eg locationCentre.lat()
  const geocoder = new google.maps.Geocoder();
  // Function: lists 20 nearby places
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      locationCentre = results[0].geometry.location;
      var request = {
        location: locationCentre,
        radius: '5000', // in metres
        type: [placeType]
      };
      
      var nearbySearchService = new google.maps.places.PlacesService(document.createElement('div'));
      console.log('OK');
      return nearbySearchService.nearbySearch(request, callback);
      
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
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
    nearbyPlaces20 = listOfPlaces;
    console.log(nearbyPlaces20);
    console.log(JSON.stringify(nearbyPlaces20));
    return listOfPlaces;
  }
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
