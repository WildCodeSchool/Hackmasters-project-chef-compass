import { Component, OnInit } from '@angular/core';
import { Recipes } from 'src/app/models/modelRecipe/recipes.model';
import { RecipesService } from 'src/app/services/recipies/recipes.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss'],
})
export class AllRecipesComponent implements OnInit {
  recipes!: Recipes;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipesService.recipesSubject.subscribe((updatedRecipes: Recipes) => {
      this.recipes = updatedRecipes;
    });
  }
}
