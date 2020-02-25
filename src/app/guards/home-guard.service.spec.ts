import { TestBed } from '@angular/core/testing';

import { HomeGuardService } from './home-guard.service';

describe('HomeGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HomeGuardService = TestBed.get(HomeGuardService);
    expect(service).toBeTruthy();
  });
});
