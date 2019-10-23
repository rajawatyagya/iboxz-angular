import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageAssessmentComponent } from './language-assessment.component';

describe('LanguageAssessmentComponent', () => {
  let component: LanguageAssessmentComponent;
  let fixture: ComponentFixture<LanguageAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
