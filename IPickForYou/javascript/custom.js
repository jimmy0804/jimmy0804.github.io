// Make sure the website is loaded as https so that chrome won't complaint about geolocation
var host = "jimmy0804.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";


// vars.
var apuKey = "AIzaSyDuUwTdZox59hwO8INMfG6vgXr_7kOwJdo"
var locationTag = document.getElementById("location-result");
var sliderTag = document.getElementById("slider-result");
var warningMessageTag = document.getElementById("warning-message");
var detailView = document.getElementById("detail-view");
var restaurantNameTag = document.getElementById("restaurant-name");
var restaurantAddressTag = document.getElementById("restaurant-address");
var latitude = 0;///22.265737;
var longitude = 0; //114.236640;
var sliderValue = 200;
var selectedLocationLatLng;
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
    type: 'restaurant',
    openNow: true
  };
  infowindow = new google.maps.InfoWindow();
  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    if (results.length > 0) {
      var randomNumber = Math.floor(Math.random() * results.length);
      createMarker(results[randomNumber]);
      getPlaceDetail(results[randomNumber].place_id);
      ScrollToTarget();
    }
  }
}

function getPlaceDetail(placeId) {
  var request = {
  placeId: placeId
};
service.getDetails(request, getPlaceDetailCallBack);
}

function getPlaceDetailCallBack(place, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
      console.log(place);
    }
}

function createMarker(place) {
  console.log(place);
  selectedLocationLatLng = place.geometry.location;
  // Show the restaurant name on the website
  restaurantNameTag.innerHTML = place.name;
  restaurantAddressTag.innerHTML = place.vicinity;
  var marker = new google.maps.Marker({
    map: map,
    position: selectedLocationLatLng
  });

 maxZoomService = new google.maps.MaxZoomService();

 map.addListener('click', showMaxZoom);

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function showMaxZoom(e) {
  //selectedLocationLatLng = new google.maps.LatLng(latitude,longitude)
  maxZoomService.getMaxZoomAtLatLng(e.latLng, function(response) {
    if (response.status !== google.maps.MaxZoomStatus.OK) {
      infoWindow.setContent('Error in MaxZoomService');
      console.log("???");
    } else {
      infoWindow.setContent(
          'The maximum zoom at this location is: ' + response.zoom);
          console.log('The maximum zoom at this location is: ' + response.zoom);
    }
    infoWindow.setPosition(e.latLng);
    infoWindow.open(map);
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
      detailView.removeAttribute("style");
      initialize();
    }
  });
}







// Get Location Methods
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
  locationTag.style.color = "#E71D36"
  switch (error.code) {
    case 0:
    locationTag.innerHTML = "Something went wrong, we could not get your current location.";
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

// Init for Bootstrap slider
function sliderSetUp() {
      $('#ex1').slider({
      formatter: function(value) {
        sliderValue = value
        var walkingTime = value / 83
        sliderTag.innerHTML = value + "m" + " walking ETA:" + Math.floor(walkingTime) + " mins"
      }
    });
}

function ScrollToTarget()
{
     detailView.scrollIntoView(true);
}

function init() {
  sliderSetUp();
  clickActions();
}

$(document).ready(init());
