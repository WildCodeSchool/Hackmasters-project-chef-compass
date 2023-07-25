import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRecipesComponent } from './card-recipes.component';

describe('CardRecipesComponent', () => {
  let component: CardRecipesComponent;
  let fixture: ComponentFixture<CardRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardRecipesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CardRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
