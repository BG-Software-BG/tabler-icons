import { Component, ElementRef, HostBinding, Inject, Input, OnChanges, Renderer2 } from '@angular/core';
import defaultAttributes from '../defaultAttributes';
import { TablerIcon, TablerIconNode } from '../types';
import { TablerIconConfig } from './tabler-icon.config';
import { ITablerIconProvider, TABLER_ICONS } from './tabler-icon.provider';

type SvgAttributes = { [key: string]: string | number | undefined };

// todo add documentation
// todo test with older Angular versions
// todo test stadalone
@Component({
  selector: 'tabler-icon',
  // standalone: true,
  template: '<ng-content></ng-content>'
})
export class TablerIconComponent implements OnChanges {
  @Input({ required: true }) icon!: TablerIcon | string;
  @Input() size?: number;
  @Input() color?: string;
  @Input() strokeWidth?: number;
  @Input() class?: string;
  @Input()
  @HostBinding('style.height.px')
  @HostBinding('style.width.px')
  size?: number;

  constructor(
    @Inject(Renderer2) private readonly renderer: Renderer2,
    @Inject(TABLER_ICONS) private readonly iconProviders: ITablerIconProvider[],
    @Inject(ElementRef) private readonly elementRef: ElementRef,
    @Inject(TablerIconConfig) private readonly iconConfig: TablerIconConfig
  ) {}

  ngOnChanges() {
    this.size ??= this.iconConfig.size;
    if (typeof this.icon === 'string') {
      const icon = this.getIconFromProviders(this.toPascalCase(this.icon));
      if (icon) {
        this.replaceElement(icon);
      } else {
        throw new Error(`The ${this.icon} icon is not provided by any of the icon providers.`);
      }
    } else if (this.icon != null && Array.isArray(this.icon.nodes)) {
      this.replaceElement(this.icon);
    } else {
      throw new Error(`Icon has to be provided ! ! !.`);
    }
  }

  private replaceElement(icon: TablerIcon): void {
    const typeAttributes = icon.type === 'outline'
      ? {
        stroke: this.color ?? this.iconConfig.color,
        'stroke-width': this.strokeWidth ?? this.iconConfig.strokeWidth
      }
      : {
        fill: this.color ?? this.iconConfig.color
      };

    const attributes = {
      ...defaultAttributes[icon.type],
      ...typeAttributes,
      width: this.size,
      height: this.size
    };

    const iconElement = this.createElement(['svg', attributes, icon.nodes]);
    iconElement.classList.add('tabler-icon', `tabler-icon-${icon.name}`, this.class?.split(/ /).map(x => x.trim()));

    const childElements = this.elementRef.nativeElement.childNodes;
    for (const childElement of childElements) {
      this.renderer.removeChild(this.elementRef.nativeElement, childElement);
    }

    this.renderer.appendChild(this.elementRef.nativeElement, iconElement);
  }

  private createElement([tag, attributes, nodes]: readonly [string, SvgAttributes, TablerIconNode[]?]) {
    const element = this.renderer.createElement(tag, 'http://www.w3.org/2000/svg');

    Object.keys(attributes).forEach(key => {
      if (attributes[key]) {
        const value = typeof attributes[key] === 'string' ? attributes[key] as string : attributes[key]!.toString();
        this.renderer.setAttribute(element, key, value);
      }
    });

    if (nodes && nodes.length > 0) {
      nodes.forEach((node: TablerIconNode) => {
        const childElement = this.createElement(node);
        this.renderer.appendChild(element, childElement);
      });
    }

    return element;
  }

  private getIconFromProviders(iconName: string): TablerIcon | null {
    for (const provider of Array.isArray(this.iconProviders) ? this.iconProviders : [this.iconProviders]) {
      const icon = provider.getIcon(iconName);
      if (icon) return icon;
    }
    return null;
  }

  private toPascalCase = (value: string): string => value.split('-')
    .map(v => v.charAt(0).toUpperCase() + v.slice(1).toLowerCase())
    .join('');
}
