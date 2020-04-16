"use strict";

const NAME = 'tool';

interface Element {
  id: number,
  html: string
}

export default class Controls {
  protected target: HTMLElement;
  protected elements: Array<Element>;
  private id: number = 0;
  constructor(target: HTMLElement) {
    this.target = target;
  }

  add(icon: string, id: string, className: string, value: string) {
    let html = '<input type="radio" id="' + id + '" name="' + NAME + '" value="' + value + '">';
    html += '<label for="' + + '" class="' + className + '">';
    this.elements.push({
      id: this.id,
      html: html
    });
  }

  remove(id: number) {
    let index = this.elements.indexOf(this.elements.find(element => element.id === id));
    this.elements.splice(index, 1);
  }

  //@TODO implement me!
  disable(id: number) {
    let element = this.elements.find(element => element.id === id);
  }
}


/*
 let buttons = document.getElementsByName('tool');

    for (let button of buttons) {
      button.addEventListener('click', (e) => {
        this.map.removeInteraction(this.draw);
        this.map.removeInteraction(this.snap);
        this.addInteractions();
      })
    }


*/