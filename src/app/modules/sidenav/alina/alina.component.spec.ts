import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlinaComponent } from './alina.component';

describe('AlinaComponent', () => {
  let component: AlinaComponent;
  let fixture: ComponentFixture<AlinaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlinaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
