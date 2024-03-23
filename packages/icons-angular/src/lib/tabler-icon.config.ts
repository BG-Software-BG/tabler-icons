import { Injectable } from '@angular/core';
import defaultAttributes from '../defaultAttributes';

@Injectable({ providedIn: 'root' })
export class TablerIconConfig {
  size: number = defaultAttributes.outline.width;
  color: string = defaultAttributes.outline.stroke;
  strokeWidth: number = defaultAttributes.outline.strokeWidth;
}
