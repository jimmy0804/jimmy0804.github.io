// Make sure the website is loaded as https so that chrome won't complaint about geolocation
var host = "jimmy0804.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";


// vars.
var apuKey = "AIzaSyDuUwTdZox59hwO8INMfG6vgXr_7kOwJdo"
var locationTag = document.getElementById("location-result");
var sliderTag = document.getElementById("slider-result");
var warningMessageTag = document.getElementById("warning-message");
var latitude = 0
var longitude = 0
var sliderValue = 20;
var geoOptions = {
  timeout: 10 * 1000
}

function clickActions() {
  $('.getLocation').click(function() {
      getLocation();
      warningMessageTag.innerHTML = "";
  });

  $('.getRestaurant').click(function() {
    if (latitude == 0 && longitude == 0) {
      warningMessageTag.innerHTML = "Please let us know your current location by clicking the above button.";
    }
    else {
      getRestaurantJSON()
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

function getRestaurantJSON() {
  var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" + latitude + "," + longitude + "&radius=" + sliderValue + "&types=restaurant&key=" + apuKey;

    $.ajax({
    type: 'GET',
    url: url,
    //data: daa,
    success: function(data) {
    //You can use any jQuery/JavaScript here!!!
      //if (data == "success") {

        alert(data);
    //  }
    },
    dataType: 'JSON'
  });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,geoError,geoOptions);
          locationTag.innerHTML = "Yeah! I got your location."
    }
}

function showPosition(position) {
    locationTag.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    var latlon = position.coords.latitude + "," + position.coords.longitude;
    var img_url = "http://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false";

document.getElementById("mapholder").innerHTML = "<img src='"+img_url+"'>";
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
