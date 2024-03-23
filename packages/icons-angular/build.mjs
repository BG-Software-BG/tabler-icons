#!/usr/bin/env node

import { buildJsIcons } from '../../.build/build-icons.mjs';

const componentTemplate = ({
  type, name, namePascal, children
}) => `
import { Component, ElementRef, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { IconNode } from '../types';

@Component({
  selector: 'icon-${name}',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class ${namePascal}Component implements OnInit {
  @Input() size: number = 24;
  @Input() stroke: number = 2;
  @Input() color: string = 'currentColor';
  @Input() class: string = '';

  constructor(
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Inject(Renderer2) private readonly renderer: Renderer2
  ) {}

  ngOnInit() {
    this.createElement(${JSON.stringify(Array.isArray(children) ? children : [children])});
  }

  private createElement(iconNode: IconNode) {
    const el = this.renderer.createElement('svg', 'http://www.w3.org/2000/svg');
    this.renderer.setAttribute(el, 'width', \`\$\{this.size\}\`);
    this.renderer.setAttribute(el, 'height', \`\$\{this.size\}\`);
    this.renderer.setAttribute(el, 'stroke-width', \`\$\{this.stroke\}\`);
    this.renderer.setAttribute(el, 'stroke', \`\$\{this.color\}\`);
    this.renderer.setAttribute(el, 'class', \`tabler-icon tabler-icon-${name} \$\{this.class\}\`);
    this.renderer.setAttribute(el, 'stroke-linecap', 'round');
    this.renderer.setAttribute(el, 'stroke-linejoin', 'round');
    this.renderer.setAttribute(el, 'view-box', '0 0 24 24');
    this.renderer.setAttribute(el, 'fill', 'none');
    this.renderer.setAttribute(el, 'xmlns', 'http://www.w3.org/2000/svg');

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
`;

const indexItemTemplate = ({
                             name,
                             namePascal
                           }) => `export * as ${namePascal}Component from './icons/${namePascal}';`;

const aliasTemplate = ({ fromPascal, toPascal }) => `export * as Icon${fromPascal} from './Icon${toPascal}';\n`;

buildJsIcons({
  name: 'icons-angular',
  componentTemplate,
  indexItemTemplate,
  aliasTemplate,
  indexFile: '../public-api.ts',
  pascalCase: true,
  extension: 'ts',
  pretty: false
});
