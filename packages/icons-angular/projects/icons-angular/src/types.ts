export type TablerIconNode = [elementName: string, attrs: Record<string, string>];
export type TablerIcon = { name: string, type: 'outline' | 'filled', nodes: TablerIconNode[] };
export type TablerIcons = { [key: string]: TablerIcon };

export interface IconProps extends Partial<Omit<SVGSVGElement, 'stroke'>> {
  size?: string | number;
  stroke?: string | number;
}
