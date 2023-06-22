import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesUrl = '../../assets/data/recipes.json';
  private modalOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  constructor(private http: HttpClient) {}
  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.recipesUrl);
  }
  getAllRecipes(): Observable<any[]> {
    return this.getRecipes();
  }

  getRecipeByName(nameId: string): Observable<any> {
    return this.getAllRecipes().pipe(
      map((recipes) => recipes.find((recipe) => recipe.recipe_name.toLowerCase() === nameId.toLowerCase()))
    );
  }
  getRecipeByCategory(typeId: string): Observable<any[]> {
    return this.getAllRecipes().pipe(
      map((recipes) => recipes.filter((recipe) => recipe.recipe_type.toLowerCase() === typeId.toLowerCase()))
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
  openModal() {
    this.modalOpenSubject.next(true);
  }

  closeModal() {
    this.modalOpenSubject.next(false);
  }
}
