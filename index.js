function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
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
      resultsMap.setCenter(results[0].geometry.location);
      new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location,
      });
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });
}

function getListOfRestaurants()