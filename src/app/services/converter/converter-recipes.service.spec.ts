import { TestBed } from '@angular/core/testing';

import { ConverterRecipesService } from './converter-recipes.service';

describe('ConverterRecipesService', () => {
  let service: ConverterRecipesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterRecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
