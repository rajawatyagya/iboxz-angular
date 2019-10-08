import { TestBed } from '@angular/core/testing';

import { SpeechRecogniserService } from './speech-recogniser.service';

describe('SpeechRecogniserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechRecogniserService = TestBed.get(SpeechRecogniserService);
    expect(service).toBeTruthy();
  });
});
