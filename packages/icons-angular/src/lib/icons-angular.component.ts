import { Component, ElementRef, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { IconNode } from '../types';

@Component({
  selector: 'tabler-icon[name]',
  standalone: true,
  imports: [],
  template: '<ng-content></ng-content>'
})
export class IconsAngularComponent implements OnInit {
  @Input() size: number = 24;
  @Input() stroke: number = 2;
  @Input() color: string = 'currentColor';
  @Input() class: string = '';

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Inject(Renderer2) private readonly renderer: Renderer2) {}

  ngOnInit() {
    // this.createElement();
  }

  private createElement(iconNode: IconNode) {
    const el = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(el, 'width', `${this.size}`);
    this.renderer.setAttribute(el, 'height', `${this.size}`);
    this.renderer.setAttribute(el, 'stroke-width', `${this.stroke}`);
    this.renderer.setAttribute(el, 'stroke', `${this.color}`);
    this.renderer.setAttribute(el, 'class', `tabler-icon tabler-icon-`);

    if (iconNode.length) {
      iconNode.forEach(([tag, attrs]) => {
        const childEl = this.renderer.createElement(tag);

        Object.keys(attrs).map(attrName => {
          const attrValue = attrs[attrName as keyof typeof attrs];
          this.renderer.setAttribute(childEl, attrName, attrValue);
        })

        this.renderer.appendChild(el, childEl);
      });
    }

    const childElements = this.elementRef.nativeElement.childNodes;
    for (const child of childElements) {
      this.renderer.removeChild(this.elementRef.nativeElement, child);
    }
    this.renderer.appendChild(this.elementRef.nativeElement, el);
  }
}
