import { TestBed } from '@angular/core/testing';

import { FormControlValidationService } from './form-control-validation.service';

describe('FormControlValidationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormControlValidationService = TestBed.get(FormControlValidationService);
    expect(service).toBeTruthy();
  });
});
