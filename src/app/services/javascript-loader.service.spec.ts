import { TestBed } from '@angular/core/testing';

import { JavascriptLoaderService } from './javascript-loader.service';

describe('JavascriptLoaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JavascriptLoaderService = TestBed.get(JavascriptLoaderService);
    expect(service).toBeTruthy();
  });
});
