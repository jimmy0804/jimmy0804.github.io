// Make sure the website is loaded as https so that chrome won't complaint about geolocation
var host = "jimmy0804.github.io";
if ((host == window.location.host) && (window.location.protocol != "https:"))
    window.location.protocol = "https";


// vars.
var locationResult = document.getElementById("location-result");
var sliderResult = document.getElementById("slider-result");

function clickActions() {
  $('.getLocation').click(function() {
      getLocation();
  });
}

function sliderSetUp() {
      $('#ex1').slider({
      formatter: function(value) {
        sliderResult.innerHTML = value
      }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        locationResult.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    locationResult.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

function init() {
  sliderSetUp();
  clickActions();
}

$(document).ready(init());
