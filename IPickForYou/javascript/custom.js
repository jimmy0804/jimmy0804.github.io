// Make sure the website is loaded as https so that chrome won't complaint about geolocation
var host = "jimmy0804.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";


// vars.
var apuKey = "AIzaSyDuUwTdZox59hwO8INMfG6vgXr_7kOwJdo"
var locationTag = document.getElementById("location-result");
var sliderTag = document.getElementById("slider-result");
var warningMessageTag = document.getElementById("warning-message");
var latitude = 0//22.265737
var longitude = 0 //114.236640
var sliderValue = 200;
var geoOptions = {
  timeout: 10 * 1000
}

var map;
var service;
var infowindow;

function initialize() {
  var pyrmont = new google.maps.LatLng(latitude,longitude);

  map = new google.maps.Map(document.getElementById('map'), {
      center: pyrmont,
      zoom: 15
    });

  var request = {
    location: pyrmont,
    radius: sliderValue,
    types: ['restaurant','food']
  };

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    console.log("yes")
    if (results.length > 0) {
      var randomNumber = Math.floor(Math.random() * results.length)
      console.log(randomNumber)
      createMarker(results[randomNumber])
    }

//    for (var i = 0; i < results.length; i++) {
//      var place = results[i];
//      createMarker(results[i]);
//    }
  }
}

function createMarker(place) {
  var placeLoc = place.geometry.location;
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function clickActions() {
  $('.getLocation').click(function() {
      getLocation();
      warningMessageTag.innerHTML = "";
  });

  $('.getRestaurant').click(function() {
    console.log(latitude)
    console.log(longitude);
    if (latitude == 0 && longitude == 0) {
      warningMessageTag.innerHTML = "Please let us know your current location by clicking the above button.";
    }
    else {
      initialize();
    }
  });
}

function sliderSetUp() {
      $('#ex1').slider({
      formatter: function(value) {
        sliderValue = value
        sliderTag.innerHTML = value + "m"
      }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,geoError,geoOptions);
          locationTag.innerHTML = "Yeah! I got your location."
    }
}

function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

function geoError(error) {
  console.log('Error occurred. Error code: ' + error.code);
  switch (error.code) {
    case 0: locationTag.innerHTML = "Something went wrong, we could not get your current location.";
    break;
    case 1: locationTag.innerHTML = "Premission denied, we could not get your current location.";
    break;
    case 2: locationTag.innerHTML = "Something went wrong, we could not get your current location.";
    break;
    default: locationTag.innerHTML = "Something went wrong, we could not get your current location."
  }
   // error.code can be:
   //   0: unknown error
   //   1: permission denied
   //   2: position unavailable (error response from location provider)
   //   3: timed out
}

function init() {
  sliderSetUp();
  clickActions();
}

$(document).ready(init());
