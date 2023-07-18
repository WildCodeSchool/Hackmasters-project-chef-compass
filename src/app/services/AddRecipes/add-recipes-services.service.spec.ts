import { TestBed } from '@angular/core/testing';

import { AddRecipesServicesService } from './add-recipes-services.service';

describe('AddRecipesServicesService', () => {
  let service: AddRecipesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddRecipesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
