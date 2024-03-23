export type IconNode = [elementName: string, attrs: Record<string, string>][];
export type TablerIcons = { [key: string]: IconNode[] };

export interface IconProps extends Partial<Omit<SVGSVGElement, 'stroke'>> {
  size?: string | number;
  stroke?: string | number;
}
