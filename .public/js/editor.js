"use strict";
import { Draw, Snap } from 'ol/interaction';
export default class Editor {
    constructor(map) {
        this.map = map;
    }
    addLayer(layer, source) {
        layer.setSource(source);
        this.map.addLayer(layer);
    }
    addStyle() {
    }
    addInteractions(source) {
        let draw = new Draw({
            source: source,
            type: document.querySelector('input[name="tool"]:checked').value
        });
        this.map.addInteraction(draw);
        let snap = new Snap({ source: source });
        this.map.addInteraction(snap);
    }
}
