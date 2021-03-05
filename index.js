let locationCentre;
let locationCentreMarker;
let service;
let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: -37.812745, lng: 144.960566 },
  });
  const geocoder = new google.maps.Geocoder();
  document.getElementById("submit").addEventListener("click", () => {
    markAddress(geocoder, map);
  });
}

function markAddress(geocoder, resultsMap) {
  const address = document.getElementById("address").value;
  geocoder.geocode({ address: address }, (results, status) => {
    if (status === "OK") {
      locationCentre = results[0].geometry.location;
      resultsMap.setCenter(locationCentre);
      locationCentreMarker = new google.maps.Marker({
        map: resultsMap,
        position: locationCentre,
      });
      var allNearbyRestaurants = listNearbyRestaurants(resultsMap);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function listNearbyRestaurants(resultsMap) {
  var request = {
    location: locationCentre,
    radius: '5000',
    type: ['restaurant']
  };

  service = new google.maps.places.PlacesService(resultsMap);
  return service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log(results.length);
    for (var i = 0; i < results.length; i++) {
      console.log(haversine_distance(locationCentre, results[i].geometry.location))
    }
    return results;
  }
}

function haversine_distance(mk1, mk2) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = mk1.lat() * (Math.PI/180); // Convert degrees to radians
  var rlat2 = mk2.lat() * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (mk2.lng()-mk1.lng()) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}