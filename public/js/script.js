
var THRESH = 0.005;

var map, GeoMarker, clueLatlng, clueMarker;

var euclidean = function(lat_0, lng_0, lat_1, lng_1) {
  var f = (lat_0 - lat_1);
  var f2 = (lng_0 - lng_1);
  return Math.sqrt(f * f + f2 * f2);
}

var queryPosition = function() {
  var lat_0 = GeoMarker.getPosition().lat()
    , lng_0 = GeoMarker.getPosition().lng()
    , lat_1 = clueLatlng.lat()
    , lng_1 = clueLatlng.lng();

  if (euclidean(lat_0, lng_0, lat_1, lng_1) < THRESH) {
    $.ajax({
      type: "POST",
      url: "/clue",
      data: {
        lat: lat_0,
        lng: lng_0
      }
    }).done(function(resp) {
      console.log("close enough");
      window.location.reload();
    }).fail(function(jqXHR, textStatus) {
      console.log("not close enough");
    });
  } else {
    console.log("Failed client js euclidian");
  }
};

var initialize = function() {
  var mapOptions = {
    zoom: 17,
    center: new google.maps.LatLng(42.447528, -76.501751),
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  var bounds = new google.maps.LatLngBounds();

  clueLatlng = new google.maps.LatLng(hunt.clue.lat, hunt.clue.lng);

  clueMarker = new google.maps.Marker({
    position: clueLatlng,
    map: map,
    title: hunt.clue.title
  });

  GeoMarker = new GeolocationMarker();
  GeoMarker.setCircleOptions({fillColor: '#808080'});

  google.maps.event.addListenerOnce(GeoMarker, 'position_changed', function() {
    map.setCenter(this.getPosition());
    bounds.extend(clueLatlng);
    bounds.union(this.getBounds());

    map.fitBounds(bounds);

    queryPosition();
  });

  google.maps.event.addListener(GeoMarker, 'geolocation_error', function(e) {
    alert('There was an error obtaining your position. Message: ' + e.message);
  });

  GeoMarker.setMap(map);
};

$(window).load(initialize);

$(window).resize(function() {
  map.setCenter(GeoMarker.getPosition());
});
