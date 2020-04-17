"use strict";
export const NAME = 'tool';
export class Controls {
    constructor(plugin, target) {
        this.id = 0;
        this.target = target;
        this.plugin = plugin;
    }
    add(icon, id, value) {
        let html = '<input type="radio" id="' + id + '" name="' + NAME + '" value="' + value + '">';
        html += '<label for="' + +'" class="' + icon + '">';
        this.elements.push({
            id: this.id,
            html: html,
            active: true
        });
        this.init();
    }
    init() {
        let buttons = document.getElementsByName(NAME);
        for (let button of buttons) {
            button.addEventListener('click', function () {
                let labels = document.querySelectorAll('label[for="' + NAME + '"]');
                for (let label of labels) {
                    label.style.setProperty('opacity', '.3');
                }
                //active
                let value = this.value;
                document.querySelector('label[for="' + value + '"]').style.setProperty('opacity', '1');
                //this.plugin.removeInteractions();
                //this.plugin.addInteractions();
            });
        }
    }
    remove(id) {
        let index = this.elements.indexOf(this.elements.find(element => element.id === id));
        this.elements.splice(index, 1);
    }
    //@todo implement me!
    disable(id) {
        let element = this.elements.find(element => element.id === id);
        let tmp = document.createElement('div');
        tmp.innerHTML = element.html;
        let label = tmp.querySelector('label');
        label.className = label.className + ' disabled';
        element.active = false;
    }
    render() {
        let html = '';
        for (let element of this.elements) {
            if (!element.active)
                continue;
            html += element.html;
        }
        this.target.innerHTML = html;
    }
}
