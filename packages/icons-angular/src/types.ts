export type TablerIconNode = [elementName: string, attrs: Record<string, string>];
export type TablerIcon = TablerIconNode[];
export type TablerIcons = { [key: string]: TablerIconNode[] };

export interface IconProps extends Partial<Omit<SVGSVGElement, 'stroke'>> {
  size?: string | number;
  stroke?: string | number;
}
