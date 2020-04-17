"use strict";
import Plugin from '../plugin.js';

export const NAME = 'tool';

interface Element {
  id: number,
  html: string,
  active: boolean
}

export class Controls {
  protected target: HTMLElement;
  protected plugin: Plugin;
  protected elements: Array<Element>;
  private id: number = 0;
  constructor(plugin: Plugin, target: HTMLElement) {
    this.target = target;
    this.plugin = plugin;
  }

  add(icon: string, id: string, value: string) {
    let html = '<input type="radio" id="' + id + '" name="' + NAME + '" value="' + value + '">';
    html += '<label for="' + + '" class="' + icon + '">';
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
      button.addEventListener('click', function() {
        let labels: NodeList = document.querySelectorAll('label[for="' + NAME + '"]');

        for (let label of labels) {
          (<HTMLLabelElement>label).style.setProperty('opacity', '.3');
        }
        //active
        let value: string = (<HTMLInputElement>this).value;
        (<HTMLLabelElement>document.querySelector('label[for="' + value + '"]')).style.setProperty('opacity', '1');

        //this.plugin.removeInteractions();
        //this.plugin.addInteractions();
      })
    }
  }

  remove(id: number) {
    let index = this.elements.indexOf(this.elements.find(element => element.id === id));
    this.elements.splice(index, 1);
  }

  //@todo implement me!
  disable(id: number) {
    let element = this.elements.find(element => element.id === id);

    let tmp: HTMLDivElement = document.createElement('div');
    tmp.innerHTML = element.html;
    let label: HTMLLabelElement = tmp.querySelector('label');
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