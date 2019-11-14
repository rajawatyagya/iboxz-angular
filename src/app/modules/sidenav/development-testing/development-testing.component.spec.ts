import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DevelopmentTestingComponent } from './development-testing.component';

describe('DevelopmentTestingComponent', () => {
  let component: DevelopmentTestingComponent;
  let fixture: ComponentFixture<DevelopmentTestingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevelopmentTestingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevelopmentTestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
