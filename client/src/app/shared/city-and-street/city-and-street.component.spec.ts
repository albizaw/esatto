import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityAndStreetComponent } from './city-and-street.component';

describe('CityAndStreetComponent', () => {
  let component: CityAndStreetComponent;
  let fixture: ComponentFixture<CityAndStreetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CityAndStreetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CityAndStreetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
