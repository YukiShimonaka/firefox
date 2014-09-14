function moveNow() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
			origins = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var marker = new google.maps.Marker({
				position: latlng,
		//			draggable: true,
				icon: new google.maps.MarkerImage(originIcon),
				title: '現在地マーカー',
				map: map
			});
			geocoder.geocode({
				'latLng': latlng
			}, function(result, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var infoWindow = new google.maps.InfoWindow({
						content: result[0].formatted_address
					});
					google.maps.event.addListener(marker, 'click', function() {
						infoWindow.open(map, marker);
					});
				} else {
					alert('エラーだ');
				}
			})
		}, function() {
			alert('現在地を取得できません');
		});
	} else {
		alert('対応していません');
	}
}

function moveOrigin() {
	geocoder.geocode({
		'address': document.getElementById('originaddress').value
	}, function(result, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.panTo(result[0].geometry.location);
			origins = result[0].geometry.location;
			var latlng = result[0].geometry.location;
			var marker = new google.maps.Marker({
				position: latlng,
				icon: new google.maps.MarkerImage(originIcon),
				title: '出発地マーカー',
				map: map
			});
			geocoder.geocode({
				'latLng': latlng
			}, function(result, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var infoWindow = new google.maps.InfoWindow({
						content: result[0].formatted_address
					});
					google.maps.event.addListener(marker, 'click', function() {
						infoWindow.open(map, marker);
					});
				} else {
					alert('エラーだ');
				}
			})
		} else {
			alert("ERROR");
		}
	});
}

function moveDestination() {
	geocoder.geocode({
		'address': document.getElementById('destinationaddress').value
	}, function(result, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.panTo(result[0].geometry.location);
			destinations[0] = result[0].geometry.location;
			var latlng = result[0].geometry.location;
			var marker = new google.maps.Marker({
				position: latlng,
				icon: new google.maps.MarkerImage(destinationIcon),
				title: '目的地マーカー',
				map: map
			});
			geocoder.geocode({
				'latLng': latlng
			}, function(result, status) {
				if (status == google.maps.GeocoderStatus.OK) {
					var infoWindow = new google.maps.InfoWindow({
						content: result[0].formatted_address
					});
					google.maps.event.addListener(marker, 'click', function() {
						infoWindow.open(map, marker);
					});
				} else {
					alert('エラーだ');
				}
			})
		} else {
			alert("ERROR");
		}
	});
}

function markerPoints() {
	var latlng = [];
	for (var i = 0; i <= lim; i++) {
		latlng[i] = new google.maps.LatLng(x_pos[i], y_pos[i]);
		if (!loadflg) {
			alert("読み込みできてない");
			break;
		} else {
			/*
			var marker = new google.maps.Marker({
				position: latlng[i],
				icon: new google.maps.MarkerImage(destinationIcon),
				title: '候補地マーカー',
				map: map
			});
*/
			destinations[i] = latlng[i];
		}
	}
}

function rangeMarker() {
	var latlng = [];
	for (var i = 0; i <= lim; i++) {
		if (rangeflg[i]) {
			latlng[i] = new google.maps.LatLng(x_pos[i], y_pos[i]);
			if (!loadflg) {
				alert("読み込みできてない");
				break;
			} else {
				var marker = new google.maps.Marker({
					position: latlng[i],
					icon: new google.maps.MarkerImage(destinationIcon),
					title: '候補地マーカー',
					map: map
				});
				console.log(latlng[i]);
			}
		} else {
			break;
		}
	}	
}

function click_marker() {
	google.maps.event.addListener(map, 'click', function(event) {
		var marker = new google.maps.Marker({
			position: event.latLng,
//			draggable: true,
//			icon: new google.maps.MarkerImage('hiro.png'),
			title: 'マーカー',
			map: map
		});
		geocoder.geocode({
			'latLng': event.latLng
		}, function(result, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				var infoWindow = new google.maps.InfoWindow({
					content: result[0].formatted_address
				});
				google.maps.event.addListener(marker, 'click', function() {
					infoWindow.open(map, marker);
				});
			} else {
				alert('エラーだ');
			}
		})
	});
}

function range() {
	range = document.getElementById('range').value;
	if (range >= 0) {
		range = range;
	} else if (range == null) {
		range = 1000;
	} else {
		range = 0;
	}
	flg = true;
}

function time() {
	document.getElementById('button').addEventListener('click', function() {
		var dd = new Date(),
			bt = document.createElement('p');
		var	aa = document.createTextNode(dd);
		document.body.appendChild(bt).appendChild(aa);
	});
}