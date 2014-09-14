function calculateDistances() {
  var service = new google.maps.DistanceMatrixService();
  for (var i = 10; i <= lim; i+=10) {
    service.getDistanceMatrix(
      {
        origins: [origins],
        destinations: [destinations[i],destinations[i+1],destinations[i+2],destinations[i+3],destinations[i+4],destinations[i+5],destinations[i+6],destinations[i+7],destinations[+8],destinations[i+9]],
        travelMode: google.maps.TravelMode.WALKING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, callback);
  }
}

function callback(response, status) {
  if (status != google.maps.DistanceMatrixStatus.OK) {
    alert('Error was: ' + status);
  } else {
    var origins = response.originAddresses;
    var destinations = response.destinationAddresses;
    var outputDiv = document.getElementById('outputDiv');
    outputDiv.innerHTML = '';
    deleteOverlays();

    var dis_range;
    if (flg) {
      dis_range = range;
    } else {
      dis_range = 1000;
    }
    for (var i = 0; i < origins.length; i++) {
      var results = response.rows[i].elements;
//      addMarker(origins[i], false);
      for (var j = 0; j <= lim; j++) {
        if (results[j].distance.value <= (dis_range * 1000)) {
          addMarker(destinations[j], true);
        }
        outputDiv.innerHTML += origins[i] + ' to ' + destinations[j]
            + ': ' + results[j].distance.text + ' in '
            + results[j].duration.text + '<br>';
            console.log(results[j].distance.value);
//          rangeflg[j] = true;
//        } else {
//          rangeflg[j] = false;
//        }
      }
    }
  }
}

function addMarker(location, isDestination) {
  var icon;
  if (isDestination) {
    icon = destinationIcon;
  } else {
    icon = originIcon;
  }
  geocoder.geocode({'address': location}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      bounds.extend(results[0].geometry.location);
      map.fitBounds(bounds);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        icon: icon
      });
      markersArray.push(marker);
    } else {
      alert('Geocode was not successful for the following reason: '
        + status);
    }
  });
}

function deleteOverlays() {
  for (var i = 0; i < markersArray.length; i++) {
    markersArray[i].setMap(null);
  }
  markersArray = [];
}