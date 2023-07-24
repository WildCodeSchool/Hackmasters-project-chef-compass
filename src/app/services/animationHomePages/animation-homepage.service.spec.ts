import { TestBed } from '@angular/core/testing';

import { AnimationHomepageService } from './animation-homepage.service';

describe('AnimationHomepageService', () => {
  let service: AnimationHomepageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnimationHomepageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
