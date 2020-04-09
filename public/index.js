import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import { Draw, Modify, Snap } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style } from 'ol/style';
import GeoJSON from 'ol/format/GeoJSON';

var raster = new TileLayer({
  source: new OSM()
});

var color = '#FF11A3';

var styleFunction = function (feature) {
  var geometry = feature.getGeometry();
  var styles = [
    // linestring
    new Style({
      stroke: new Stroke({
        color: '#ffcc33',
        width: 2
      })
    })
  ];
  console.log(geometry.getType());

  if (geometry.getType() == "LineString") {
    geometry.forEachSegment(function (start, end) {
      var dx = end[0] - start[0];
      var dy = end[1] - start[1];
      var rotation = Math.atan2(dy, dx);
      // arrows
      styles.push(new Style({
        geometry: new Point(end),
        image: new Icon({
          src: 'assets/arrow.png',
          size: [256, 256],
          scale: 0.25,
          offset: [0, 0],
          anchor: [0.75, 0.5],
          rotateWithView: true,
          rotation: -rotation
        })
      }));
    });
  }

  return styles;
};

var source = new VectorSource();

var vector2 = new VectorLayer({
  source: source,
  style: styleFunction
});

var vector = new VectorLayer({
  source: source,
  style: new Style({
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    }),
    stroke: new Stroke({
      color: color,
      width: 2
    }),
    image: new Icon({
      src: 'marker.png',
      size: [128, 128],
      offset: [0, 0],
      opacity: 1,
      scale: 0.25
    })
  })
});

var map = new Map({
  layers: [raster, vector, vector2],
  target: 'map',
  view: new View({
    center: [-11000000, 4600000],
    zoom: 4
  })
});

var modify = new Modify({ source: source });
map.addInteraction(modify);

var draw, snap; // global so we can remove them later

function addInteractions() {
  draw = new Draw({
    source: source,
    type: document.querySelector('input[name="tool"]:checked').value
  });
  map.addInteraction(draw);
  snap = new Snap({ source: source });
  map.addInteraction(snap);

}

/**
 * Handle change event.
 */
let buttons = document.getElementsByName('tool');

for (let button of buttons) {
  button.addEventListener('click', function (e) {
    map.removeInteraction(draw);
    map.removeInteraction(snap);
    addInteractions();
  })
}

addInteractions();

let labels = document.querySelectorAll('label');

for (let label of labels) {
  label.addEventListener('click', function () {
    unstyle();
    this.style.setProperty('opacity', 1);
  });
}

function unstyle() {

  let labels = document.querySelectorAll('label');

  for (let label of labels) {
    label.style.setProperty('opacity', .3);
  }
}

document.querySelector('#color').oninput = function () {
  color = this.value;
};

fetch('./berlin_bezirke.geojson')
  .then((response) => {
    return response.json();
  })
  .then((geojson) => {
    console.log(geojson);
    var berlinsouce = new VectorSource({
      features: (new GeoJSON()).readFeatures(geojson)
    });
    var berlinlayer = new VectorLayer({
      source: berlinsouce,
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.2)'
        }),
        stroke: new Stroke({
          color: 'rbga(0, 255, 0, 1',
          width: 2
        }),
      })
    })
    map.addLayer(berlinlayer);
  });