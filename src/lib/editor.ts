"use strict";
import Map from 'ol/Map';
import { Vector as VectorLayer } from 'ol/layer';
import { Draw, Snap, Select, Modify } from 'ol/interaction';
import VectorSource from 'ol/source/Vector';
import Geometry from 'ol/geom/Geometry';

export default class Editor {
    protected map: Map;

    constructor(map: Map) {
        this.map = map;
    }

    addLayer(layer: VectorLayer, source: VectorSource<Geometry>) {
        layer.setSource(source);
        this.map.addLayer(layer);
    }

    addStyle() {

    }

    addInteraction(interaction: any) {
        this.map.addInteraction(interaction);
    }

    removeInteraction(interaction: any) {
        this.map.removeInteraction(interaction);
    }
}