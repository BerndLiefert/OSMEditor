"use strict";
import VectorLayer from "ol/layer/Vector";
import { Fill, Stroke, Style } from "ol/style";
import VectorSource from "ol/source/Vector";
import GeoJSON from 'ol/format/GeoJSON';
export default class Loader {
    constructor(url) {
        this.url = url;
    }
    getVectorLayer() {
        return new VectorLayer({
            source: new VectorSource({
                "url": this.url,
                "format": new GeoJSON()
            }),
            style: new Style({
                fill: new Fill({
                    color: 'rgba(255, 255, 255, 0.2)'
                }),
                stroke: new Stroke({
                    color: 'rbga(0, 255, 0, 1',
                    width: 2
                }),
            })
        });
    }
}
