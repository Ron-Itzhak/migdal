import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageTableComponent } from './garage-table.component';

describe('GarageTableComponent', () => {
  let component: GarageTableComponent;
  let fixture: ComponentFixture<GarageTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GarageTableComponent]
    });
    fixture = TestBed.createComponent(GarageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
