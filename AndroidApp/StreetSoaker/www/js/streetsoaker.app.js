var socket = io.connect('streetsoaker.com:8080');

document.addEventListener("deviceready", deviceReady, false);

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


	draweropen = false;

	function onDrawerShow() {
		draweropen = true;
		document.addEventListener("backbutton", onBackKeyDown, false);
	}

	function onDrawerHide() {
		draweropen = false;
		document.removeEventListener("backbutton", onBackKeyDown, false);
	}

	function onBackKeyDown(event) {
		$("#left-drawer").data("kendoMobileDrawer").hide();
		draweropen = false;
		event.preventDefault();
		return false;
	}
	
	document.addEventListener("menubutton", onMenuKeyDown, false);

	function onMenuKeyDown() {
		if (draweropen === true) {
			draweropen = false;
			$("#left-drawer").data("kendoMobileDrawer").hide();
		} else {
			draweropen = true;
			$("#left-drawer").data("kendoMobileDrawer").show();
		}
	}
}
