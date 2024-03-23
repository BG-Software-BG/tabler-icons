import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsAngularComponent } from './icons-angular.component';

describe('IconsAngularComponent', () => {
  let component: IconsAngularComponent;
  let fixture: ComponentFixture<IconsAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconsAngularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconsAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
