import { TestBed, inject } from '@angular/core/testing';

import { AdoptRequestService } from './adopt-request.service';

describe('AdoptRequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdoptRequestService]
    });
  });

  it('should be created', inject([AdoptRequestService], (service: AdoptRequestService) => {
    expect(service).toBeTruthy();
  }));
});
