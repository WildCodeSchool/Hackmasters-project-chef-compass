import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './recipe.interface';

@Component({
  selector: 'app-allrecipes',
  templateUrl: './allrecipes.component.html',
  styleUrls: ['./allrecipes.component.scss'],
})
export class AllrecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  dishRecipes: Recipe[] = [];
  dessertRecipes: Recipe[] = [];
  starterRecipes: Recipe[] = [];
  aperitifRecipes: Recipe[] = [];

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.http.get<any>('assets/recipes.json').toPromise();
      if (Array.isArray(response.recipes)) {
        this.recipes = response.recipes;
        this.dishRecipes = response.recipes.filter((recipe: Recipe) => recipe.dish);
        this.dessertRecipes = response.recipes.filter((recipe: Recipe) => recipe.dessert);
        this.starterRecipes = response.recipes.filter((recipe: Recipe) => recipe.starter);
        this.aperitifRecipes = response.recipes.filter((recipe: Recipe) => recipe.aperitif);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }
}
