import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import { Tile as TileLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';
import Loader from './lib/loader.js';
import Styles from './lib/styles.js';
import VectorLayer from 'ol/layer/Vector';
import { Style, Fill, Stroke, Icon } from 'ol/style';
import { Modify, Draw, Snap, Select } from 'ol/interaction';

const color = '#FF11A3';
class EditorPlugin {
  protected draw: Draw;
  protected snap: Snap;
  protected modify: Modify;
  protected select: Select;
  protected map: Map
  protected source: VectorSource;

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
    var styles = new Styles(color);
    var styleFunction = styles.style.bind(styles);

    this.source = new VectorSource();

    var arrow = new VectorLayer({
      source: this.source,
      style: styleFunction
    });

    var vector = new VectorLayer({
      source: this.source,
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

    this.map.addLayer(arrow);
    this.map.addLayer(vector);

    this.modify = new Modify({ source: this.source });
    this.map.addInteraction(this.modify);

    let buttons = document.getElementsByName('tool');

    for (let button of buttons) {
      button.addEventListener('click', (e) => {
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.snap);
        this.addInteractions();
      })
    }

    this.addInteractions();

    let labels = document.querySelectorAll('label');

    for (let label of labels) {
      label.addEventListener('click', function() {
        plugin.unstyle();
        this.style.setProperty('opacity', '1');
      });
    }
  }

  addInteractions() {
    this.draw = new Draw({
      source: this.source,
      type: document.querySelector('input[name="tool"]:checked').value
    });
    this.map.addInteraction(this.draw);
    this.snap = new Snap({ source: this.source });
    this.map.addInteraction(this.snap);
  }

  unstyle() {
    let labels = document.querySelectorAll('label');

    for (let label of labels) {
      label.style.setProperty('opacity', '.3');
    }
  }

}
let plugin = new EditorPlugin();