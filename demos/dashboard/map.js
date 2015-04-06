var map, heatmap;
$.getJSON('data/236-people.json',function(json) {
  $allPeople = json;
})
$.getJSON('data/236.json', function(json) {
  $allStores = json;
})
$.getJSON('data/236-heat.json', function(json) {
  $allHeat = json;
});

function initializeMap() {
  // MAP
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(43.7001100 , -79.4163000),
  };
  map = new google.maps.Map(document.getElementById('google-map'),
      mapOptions);
  map.data.addGeoJson($allStores);

  var infoWindow = new google.maps.InfoWindow();
  map.data.addListener('click', function(event) {
    var content = event.feature.getProperty('description');
    infoWindow.setContent(content);
    infoWindow.setPosition(event.feature.getGeometry().get());
    infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
    infoWindow.open(map);
    map.setCenter(event.latLng);
    map.setZoom(18);
    var id = event.feature.getProperty('id');
    map.data.addGeoJson($allPeople[id]);
  })

  map.data.setStyle(function(feature) {
    var sid = feature.getProperty('sid');
    if (typeof sid !== 'undefined') {
      return ({icon: 'imgs/google_map_man.gif'})
    }
  });

  // HEATMAP
  var googLatLongs = $.map($allHeat.data, function(v) {
      return new google.maps.LatLng(v[0],v[1])
    });
    var mvc = new google.maps.MVCArray(googLatLongs);

  heatmap = new google.maps.visualization.HeatmapLayer({
    maxIntensity: 10,
    data: mvc,
    radius: 10
  });

  // INSERT CONTROLS
  $stores = $.map($allStores.features, function(feature) {
    return {
      name:feature.properties.name,
      id:feature.properties.id,
      latLng:feature.geometry.coordinates,
    };
  });

  var selector = "<select class='store-selector' onchange='selectStore()'>";
  $.each($stores, function(index, store) {
    selector += "<option value="+store.id+","+
        store.latLng[1]+","+store.latLng[0] +
        ">" + store.name + "</option>";
  })
  selector += "</select>";
  var toggle = "<div class='toggle' data-value='attribution' onclick='toggleLayer(this)'>Attribution</div>"
  toggle += "<div class='toggle active' data-value='heatmap' onclick='toggleLayer(this)'>Heatmap</div>";
  var surprise = "<div class='surprise' data-value='on' onclick='surprise()'>GEO-FSA Boundaries</div>"
  $('#google-sidenav').append(selector);
  $('#google-sidenav').append(toggle);
  $('#google-sidenav').append(surprise);

  $('.toggle[data-value="heatmap"]').trigger('click');
}

function selectStore(){
  var arr = $('.store-selector').val().split(',');
  map.data.addGeoJson($allPeople[arr[0]]);
  map.setCenter(new google.maps.LatLng(parseFloat(arr[1]),parseFloat(arr[2])));
  map.setZoom(18);
}

function toggleLayer(elem){
  var toggle = $(elem);

  if (toggle.data('value') == 'attribution') {
    map.data.setStyle(function(feature) {
    var sid = feature.getProperty('sid');
    if (typeof sid !== 'undefined') {
      return ({visible: true, icon: 'imgs/google_map_man.gif'})
    }
  });
    map.setMapTypeId('roadmap');
    heatmap.setMap(null);
    toggle.addClass('active').next().removeClass('active');
  } else if (toggle.data('value')) {
    map.data.setStyle({visible: false});
    map.setMapTypeId('satellite');
    heatmap.setMap(map);
    map.setCenter(new google.maps.LatLng(43.7001100 , -79.4163000));
    map.setZoom(9);
    toggle.addClass('active').prev().removeClass('active');
  }
}

function surprise() {
  map.setMapTypeId('roadmap');
  $.getJSON('data/ontario.geojson', function(json) {
    map.data.addGeoJson(json)
  })
}

