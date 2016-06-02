// Make sure the website is loaded as https so that chrome won't complaint about geolocation
var host = "jimmy0804.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";


// vars.
var locationResult = document.getElementById("location-result");
var sliderResult = document.getElementById("slider-result");
var geoOptions = {
  timeout: 10 * 1000
}

function clickActions() {
  $('.getLocation').click(function() {
      getLocation();
  });
}

function sliderSetUp() {
      $('#ex1').slider({
      formatter: function(value) {
        sliderResult.innerHTML = value + "m"
      }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition,geoError,geoOptions);
    } else {
        locationResult.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    locationResult.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

function geoError(error) {
  console.log('Error occurred. Error code: ' + error.code);
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
