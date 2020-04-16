"use strict";
const NAME = 'tools';
export default class Controls {
    constructor(target) {
        this.target = target;
        this.html = '';
    }
    add(icon, cssClass, value) {
        this.html += '<input type="radio" name="' + NAME + '" value="' + value + '">';
        this.html += '<label for="' + +'" class="' + cssClass + '">';
    }
    remove() {
    }
    disable() {
    }
}
