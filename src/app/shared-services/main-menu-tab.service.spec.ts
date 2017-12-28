import { TestBed, inject } from '@angular/core/testing';

import { MainMenuTabService } from './main-menu-tab.service';

describe('MainMenuTabService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MainMenuTabService]
    });
  });

  it('should be created', inject([MainMenuTabService], (service: MainMenuTabService) => {
    expect(service).toBeTruthy();
  }));
});
