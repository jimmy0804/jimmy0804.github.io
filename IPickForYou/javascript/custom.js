$(document).ready(function() {
    $('#ex1').slider({
  	formatter: function(value) {
  		return 'Current value: ' + value;
  	}
  });

  var x = document.getElementById("demo");

  $('.getLocation').click(function() {
      getLocation();
  });

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
}

});
