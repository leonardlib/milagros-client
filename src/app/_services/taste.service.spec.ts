import { TestBed, inject } from '@angular/core/testing';

import { TasteService } from './taste.service';

describe('TasteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TasteService]
    });
  });

  it('should be created', inject([TasteService], (service: TasteService) => {
    expect(service).toBeTruthy();
  }));
});
