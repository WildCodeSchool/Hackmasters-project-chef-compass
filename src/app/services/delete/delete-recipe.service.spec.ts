import { TestBed } from '@angular/core/testing';

import { DeleteRecipeService } from './delete-recipe.service';

describe('DeleteRecipeService', () => {
  let service: DeleteRecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeleteRecipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
