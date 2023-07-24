import { Injectable } from '@angular/core';
import { RecipesService } from '../recipies/recipes.service';
import { Subject, Observable } from 'rxjs';
import { Recipe } from 'src/app/models/modelRecipe/recipe.model';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipes } from '../../models/modelRecipe/recipes.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:8080';
  user = 1;
  favoriteRecipes: number[] = [];

  private favoriteUpdateSubject = new Subject<void>();
  favoriteUpdate$: Observable<void> = this.favoriteUpdateSubject.asObservable();

  constructor(private recipeService: RecipesService, private http: HttpClient) {}

  addFavorite(id: number): void {
    const add = `${this.url}/favorite/create?userId=${this.user}&recipeId=${id}`;
    this.http.post(add, {}).subscribe(() => this.favoriteUpdateSubject.next());
  }

  createRecipeId(id: number): void {
    const add = `${this.url}/createRecipe/create?userId=${this.user}&recipeId=${id}`;
    this.http.post(add, {}).subscribe();
  }

  isCreateRecipe(id: number): Observable<boolean> {
    const url = `${this.url}/createRecipe/isCreated?recipeId=${id}&userId=${this.user}`;
    return this.http.get<boolean>(url, {});
  }
  isActive(recipeId: number): Observable<boolean> {
    const url = `${this.url}/favorite/check?userId=${this.user}&recipeId=${recipeId}`
    return this.http.get<boolean>(url, {});
  }


  addComment(recipeId: number, comment: string, rating: number): void {
    const recipeComments = this.comments.find((c) => c.recipe === recipeId);
    if (recipeComments) {
      recipeComments.comment.unshift({ content: comment, score: rating });
    } else {
      this.comments.push({ recipe: recipeId, comment: [{ content: comment, score: rating }] });
    }

  addComment(recipeId: number, comment: string, rating: number) {
    const url = `${this.url}/reviews`;
    const data = {
      user: { id: this.user },
      recipe: { id: recipeId },
      comment: comment,
      rating: rating,
    };
    console.log(data, url);
    return this.http.post(url, data);
  }

  loadFavoriteRecipes() {
    const param = `userId=${this.user}`;
    this.recipeService.loadRecipes('', param);
  }

  getFavoriteRecipes(): Recipes {
    return this.recipeService.recipes; // Renvoie les recettes filtrées pour les favoris
  }

  private getFilteredRecipes(recipes: Recipe[]): Recipe[] {
    return recipes?.filter((recipe: Recipe) => this.favoriteRecipes.includes(recipe.id));
  }
}
