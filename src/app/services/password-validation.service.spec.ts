import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';

import { PasswordValidationService } from './password-validation.service';

describe('PasswordValidationService', () => {
  let service: PasswordValidationService;
  const firstNameControl = new FormControl('input');
  const lastNameControl = new FormControl('input');
  const passwordControl = new FormControl('input');

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PasswordValidationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
