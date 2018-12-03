import { TestBed, inject } from '@angular/core/testing';

import { FurService } from './fur.service';

describe('FurService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FurService]
    });
  });

  it('should be created', inject([FurService], (service: FurService) => {
    expect(service).toBeTruthy();
  }));
});
