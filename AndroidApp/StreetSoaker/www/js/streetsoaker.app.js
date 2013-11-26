google.maps.event.addDomListener(window, 'load', deviceReady);

function deviceReady() {
	google.maps.visualRefresh = true;

	mapOptions = {
		center: new google.maps.LatLng(52.23, 4.55),
		zoom: 8,
		disableDefaultUI: true,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("mapView"), mapOptions);

	locationOptions = {
		timeout: 50000,
		enableHighAccuracy: true
	};
	
	watchID = navigator.geolocation.watchPosition(onSuccess, onError, locationOptions);

	function onSuccess(position) {
		var playerLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
		
		var playerMarker = new google.maps.Marker({
				position: playerLocation,
				map: map,
				title: 'playerLocation'
			});
	}

	function onError(error) {
		alert('code: '+ error.code+'\n'+'message:'+error.message+'\n');
	}

}
