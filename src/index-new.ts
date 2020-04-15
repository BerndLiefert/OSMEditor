import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import Loader from './lib/loader.js';

const color = '#FF11A3';
class EditorPlugin {
  protected map: Map;

  constructor() {
    let raster = new TileLayer({
      source: new OSM()
    });
    this.map = new Map({
      layers: [raster],
      target: 'map',
      view: new View({
        center: [-11000000, 4600000],
        zoom: 4
      })
    });
    let loader = new Loader('./berlin_bezirke.geojson');
    let berlin = loader.getVectorLayer();

    this.map.addLayer(berlin);
  }

}
let plugin = new Plugin();
/*


var styles = new Styles(color);
var styleFunction = styles.style.bind(styles);

var source = new VectorSource();

var arrow = new VectorLayer({
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
      src: './assets/marker.png',
      size: [128, 128],
      offset: [0, 0],
      opacity: 1,
      scale: 0.25
    })
  })
});

let loader = new Loader('./berlin_bezirke.geojson');
let berlin = loader.getVectorLayer();













let editor = new Editor(map);






var modify = new Modify({ source: source });
editor.addInteraction(modify);


var draw, snap, select; // global so we can remove them later

function addInteractions() {
  draw = new Draw({
    source: source,
    type: document.querySelector('input[name="tool"]:checked').value
  });
  map.addInteraction(draw);
  snap = new Snap({ source: source });
  map.addInteraction(snap);
}


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
    this.style.setProperty('opacity', '1');
  });
}

function unstyle() {

  let labels = document.querySelectorAll('label');

  for (let label of labels) {
    label.style.setProperty('opacity', '.3');
  }
}

*/