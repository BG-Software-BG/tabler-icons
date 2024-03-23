import { TestBed } from '@angular/core/testing';

import { IconsAngularService } from './icons-angular.service';

describe('IconsAngularService', () => {
  let service: IconsAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
