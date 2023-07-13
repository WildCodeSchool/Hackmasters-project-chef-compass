import { Allergen } from './modelRecipe/Allergen.model';
import { Diet } from './modelRecipe/Diet.model';
import { Step } from './modelRecipe/Step.model';
import { IngredientRecipe } from './modelRecipe/IngredientList.model';
import { Category } from './modelRecipe/Category.model';
import { Country } from './modelRecipe/Country.model';

export interface Recipe {
  id: number;
  recipeName: string;
  category: Category;
  country: Country;
  prepTime: number;
  cookTime: number;
  price: number;
  imageUrl: string;
  description: string;
  allergens: Allergen[];
  diets: Diet[];
  steps: Step[];
  ingredientRecipes: IngredientRecipe[];
}
