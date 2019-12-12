import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpPopupComponent } from './exp-popup.component';

describe('ExpPopupComponent', () => {
  let component: ExpPopupComponent;
  let fixture: ComponentFixture<ExpPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
