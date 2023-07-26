import { TestBed } from '@angular/core/testing';

import { AuthUserService } from './auth-user.service';

describe('AuthServiceService', () => {
  let service: AuthUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
