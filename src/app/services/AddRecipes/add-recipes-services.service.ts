import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Country } from '../../models/modelRecipe/Country.model';
import { Allergen } from '../../models/modelRecipe/Allergen.model';
import { Diet } from '../../models/modelRecipe/Diet.model';
import { RecipeResponse } from '../../models/modelRecipe/RecipeReponse.model';

@Injectable({
  providedIn: 'root',
})
export class AddRecipesServicesService {
  constructor(private http: HttpClient) {}

  searchUrl = 'http://localhost:8080';

  getMultipleQuery(): Observable<any[]> {
    const country = this.http.get<Country[]>(`${this.searchUrl}/countries`);
    const allergens = this.http.get<Allergen[]>(`${this.searchUrl}/allergens`);
    const diets = this.http.get<Diet[]>(`${this.searchUrl}/diets`);
    const categories = this.http.get<Diet[]>(`${this.searchUrl}/categories`);

    return forkJoin([country, allergens, diets, categories]);
  }
  async createRecipe(recipeFormValue: any): Promise<any> {
    try {
      const recipeResponse = await this.http
        .post<RecipeResponse>(`${this.searchUrl}/recipes`, {
          recipeName: recipeFormValue.names,
          category: { id: Number(recipeFormValue.categories) },
          country: { id: Number(recipeFormValue.country) },
          prepTime: recipeFormValue.prepTime,
          cookTime: recipeFormValue.cookTime,
          price: recipeFormValue.budget,
          imageUrl: recipeFormValue.picture,
          description: recipeFormValue.description,
        })
        .toPromise();

      if (!recipeResponse) {
        throw new Error('API returned undefined for recipeResponse');
      }
      console.log(recipeResponse);
      const recipeId = recipeResponse.id;

      console.log(recipeId);
      for (const step of recipeFormValue.steps) {
        console.log(step);
        await this.http
          .post(`${this.searchUrl}/steps`, [
            {
              stepDescription: step,
              recipe: { id: recipeId },
            },
          ])
          .toPromise();
      }

      for (const ingredient of recipeFormValue.ingredients) {
        console.log(ingredient);
        await this.http
          .post(`${this.searchUrl}/ingredients-recipe`, [
            {
              recipe: { id: recipeId },
              ingredient: { ingredientName: ingredient.ingredient },
              quantity: ingredient.quantity.toString(),
            },
          ])
          .toPromise();
      }
      if (recipeFormValue.diets.length > 0) {
        for (const dietId of recipeFormValue.diets) {
          await this.http
            .post(`${this.searchUrl}/recipesdiets`, [
              {
                diet: { id: dietId },
                recipe: { id: recipeId },
              },
            ])
            .toPromise();
        }
      }
      if (recipeFormValue.allergens.length > 0) {
        for (const allergenId of recipeFormValue.allergens) {
          console.log(allergenId);
          await this.http
            .post(`${this.searchUrl}/recipesallergens`, [
              {
                allergen: { id: allergenId },
                recipe: { id: recipeId },
              },
            ])
            .toPromise();
        }
      }

      return true;

    } catch (error) {
      return false;
    }
  }
}
