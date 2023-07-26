import { TestBed } from '@angular/core/testing';

import { ResetPasswordServiceService } from './reset-password-service.service';

describe('ResetPasswordServiceService', () => {
  let service: ResetPasswordServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetPasswordServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
