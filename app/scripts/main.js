// Mapboxgl demo app
'use strict';

var map;

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVuamFtaW4td3lzcyIsImEiOiJVcm5FdEw4In0.S8HRIEq8NqdtFVz2-BwQog';

mapboxgl.util.getJSON('https://www.mapbox.com/mapbox-gl-styles/styles/pencil-v5.json', function (err, style) {

    style.layers.push({
        'id': 'dataSource',
        'source': 'tom',
        'interactivity': 'true',
        'source-layer': 'us-ski',
        'render':{
            'text-field': '{name}',
            "icon-image": "marker-12"
        },
        'style': {
            'text-color': '#8786e0',
            'text-font': 'Open Sans Semibold, Arial Unicode MS Bold',
        },
        'type': 'symbol'
    });

    style.layers.forEach(function(layer) {
        layer.interactive = true;
    });


	console.log('style:');
	console.log(style);

	// init the map
    map = new mapboxgl.Map({
        container: 'map',
        style: style,
        center: [39.8282, -98.5795],
        zoom: 3,
    });

    // create the layer
    var sourceObj = new mapboxgl.Source({
        type: 'vector',
        url: 'mapbox://benjamin-wyss.ce58c117'
    });

    map.addSource('tom', sourceObj);

    console.log('map:');
    console.log(map);

    map.on('hover', function(e) {
      map.featuresAt(e.point, {bucket : 'dataSource', radius : 60}, function(err, features) {
        //console.log('click:');
        //console.log('features:');
        //console.log(features);
          if (err) throw err;
          document.getElementById('features').innerHTML = JSON.stringify(features, null, 2);
      });
  });
});


/*
	// some base layer styles

    //style: 'https://www.mapbox.com/mapbox-gl-styles/styles/bright-v4.json'
    //style: 'https://www.mapbox.com/mapbox-gl-styles/styles/pencil-v5.json'
    //style: 'https://www.mapbox.com/mapbox-gl-styles/styles/satellite-v5.json'
    style: 'https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-raster-v4.json'

*/


