import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOrdComponent } from './new-ord.component';

describe('NewOrdComponent', () => {
  let component: NewOrdComponent;
  let fixture: ComponentFixture<NewOrdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewOrdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
