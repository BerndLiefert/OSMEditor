"use strict";
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
    addInteraction(interaction) {
        this.map.addInteraction(interaction);
    }
    removeInteraction(interaction) {
        this.map.removeInteraction(interaction);
    }
}
