import { Component, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'tabler-icon',
  standalone: true,
  template: '<ng-content></ng-content>'
})
export class TablerIconComponent implements OnChanges {


  constructor() {}

  ngOnChanges(changes: SimpleChanges) {}
}
