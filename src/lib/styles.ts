"use strict";

import 'ol/ol.css';
import Point from 'ol/geom/Point';
import { Icon, Stroke, Style } from 'ol/style';
export default class Styles {
    protected color: string;

    constructor(color: string) {
        this.color = color;
    }

    style(feature: any) {
        var geometry = feature.getGeometry();
        var styles = [
            // linestring
            new Style({
                stroke: new Stroke({
                    color: this.color,
                    width: 2
                })
            })
        ];
        if (geometry.getType() == "LineString") {
            geometry.forEachSegment(function (start, end) {
                var dx = end[0] - start[0];
                var dy = end[1] - start[1];
                var rotation = Math.atan2(dy, dx);
                // arrows
                styles.push(new Style({
                    geometry: new Point(end),
                    image: new Icon({
                        src: './assets/arrow.png',
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
    }
}
