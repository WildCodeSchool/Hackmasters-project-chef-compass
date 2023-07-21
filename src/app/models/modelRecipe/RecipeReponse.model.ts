import { Country } from './Country.model';
import { Category } from './Category.model';

export interface RecipeResponse {
  id: number;
  recipeName: string;
  category: Category;
  country: Country;
  prepTime: number;
  cookTime: number;
  price: number;
  imageUrl: string;
  description: string;
  allergens: any[];
  diets: any[];
  ingredientRecipes: any[] | null;
  steps: any[];
}
