import { Recipe } from './recipe.model';

export interface Recipes {
  desserts: Recipe[];
  mainDishes: Recipe[];
  appetizers: Recipe[];
  breakfasts: Recipe[];
  sideDishes: Recipe[];
}
