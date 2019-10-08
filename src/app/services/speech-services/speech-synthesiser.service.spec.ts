import { TestBed } from '@angular/core/testing';

import { SpeechSynthesiserService } from './speech-synthesiser.service';

describe('SpeechSynthesiserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SpeechSynthesiserService = TestBed.get(SpeechSynthesiserService);
    expect(service).toBeTruthy();
  });
});
