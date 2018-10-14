import { TestBed, inject } from '@angular/core/testing';

import { SexService } from './sex.service';

describe('SexService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SexService]
    });
  });

  it('should be created', inject([SexService], (service: SexService) => {
    expect(service).toBeTruthy();
  }));
});
