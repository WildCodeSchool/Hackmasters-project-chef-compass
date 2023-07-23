import { Allergen } from './Allergen.model';
import { Diet } from './Diet.model';
import { Step } from './Step.model';
import { IngredientRecipe } from './IngredientList.model';
import { Category } from './Category.model';
import { Country } from './Country.model';
import { Review } from './reviews.models';

export interface Recipe {
  id: number;
  recipeName: string;
  recipeSlug: string;
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
  reviews: Review[];
}
