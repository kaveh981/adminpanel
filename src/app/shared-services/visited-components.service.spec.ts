import { TestBed, inject } from '@angular/core/testing';

import { VisitedComponentsService } from './visited-components.service';

describe('VisitedComponentsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VisitedComponentsService]
    });
  });

  it('should be created', inject([VisitedComponentsService], (service: VisitedComponentsService) => {
    expect(service).toBeTruthy();
  }));
});
