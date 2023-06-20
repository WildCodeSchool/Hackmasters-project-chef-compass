import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesUrl = '../../assets/data/recipes.json';

  constructor(private http: HttpClient) {}

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.recipesUrl).pipe(catchError(this.handleError));
  }

  getRecipeByName(nameId: string): Observable<any> {
    return this.getRecipes().pipe(
      map((recipes) => recipes.find((recipes) => recipes.recipe_name.toLowerCase() === nameId.toLowerCase()))
    );
  }

  saveRecipe(recipe: any): Observable<any> {
    // TODO: Implement actual recipe saving logic here
    // For now, let's return a dummy response
    return this.http.post<any>('url-to-save-recipe', recipe).pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Erreur de requête POST:', error);
    return throwError('Une erreur est survenue. Veuillez réessayer ultérieurement.');
  }
}
