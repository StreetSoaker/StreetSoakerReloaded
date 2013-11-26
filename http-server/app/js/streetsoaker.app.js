function initialize() {
	google.maps.visualRefresh = true;

	var mapOptions = {
		center: new google.maps.LatLng(-34.397, 150.644),
		zoom: 8,
		disableDefaultUI: true
	};
	var map = new google.maps.Map(document.getElementById("mapView"),
		mapOptions);
	}

google.maps.event.addDomListener(window, 'load', initialize);

function getLocation(method) {

}

