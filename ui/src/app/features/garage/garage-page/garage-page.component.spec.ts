import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaragePageComponent } from './garage-page.component';

describe('GaragePageComponent', () => {
  let component: GaragePageComponent;
  let fixture: ComponentFixture<GaragePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GaragePageComponent],
    });
    fixture = TestBed.createComponent(GaragePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
