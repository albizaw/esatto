import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstAndLastNameComponent } from './first-and-last-name.component';

describe('FirstAndLastNameComponent', () => {
  let component: FirstAndLastNameComponent;
  let fixture: ComponentFixture<FirstAndLastNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FirstAndLastNameComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FirstAndLastNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
