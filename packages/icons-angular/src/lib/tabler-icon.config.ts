import { Injectable } from '@angular/core';
import defaultAttributes from '../defaultAttributes';

@Injectable({ providedIn: 'root' })
export class TablerIconConfig {
  size?: number;
  color?: string;
  stroke?: number;
}
