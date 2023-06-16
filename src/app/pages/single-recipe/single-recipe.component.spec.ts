import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleRecipeComponent } from './single-recipe.component';

describe('SingleRecipeComponent', () => {
  let component: SingleRecipeComponent;
  let fixture: ComponentFixture<SingleRecipeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleRecipeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
