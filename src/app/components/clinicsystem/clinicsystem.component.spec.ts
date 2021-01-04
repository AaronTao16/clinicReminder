import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicsystemComponent } from './clinicsystem.component';

describe('ClinicsystemComponent', () => {
  let component: ClinicsystemComponent;
  let fixture: ComponentFixture<ClinicsystemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClinicsystemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClinicsystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
