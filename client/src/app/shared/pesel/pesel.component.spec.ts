import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeselComponent } from './pesel.component';

describe('PeselComponent', () => {
  let component: PeselComponent;
  let fixture: ComponentFixture<PeselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeselComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PeselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
