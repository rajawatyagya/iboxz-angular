import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DomainTestComponent } from './domain-test.component';

describe('InterviewsComponent', () => {
  let component: DomainTestComponent;
  let fixture: ComponentFixture<DomainTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DomainTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DomainTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
