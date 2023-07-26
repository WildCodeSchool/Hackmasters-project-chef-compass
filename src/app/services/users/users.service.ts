import { Injectable } from '@angular/core';
import { RecipesService } from '../recipies/recipes.service';
import { Subject, Observable } from 'rxjs';
import { Recipe } from 'src/app/models/modelRecipe/recipe.model';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Recipes } from '../../models/modelRecipe/recipes.model';
import { AuthUserService } from '../auth-user/auth-user.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  url = 'http://localhost:3000';
  user = this.authService.userId;
  favoriteRecipes: number[] = [];

  private favoriteUpdateSubject = new Subject<void>();
  favoriteUpdate$: Observable<void> = this.favoriteUpdateSubject.asObservable();

  constructor(private recipeService: RecipesService, private http: HttpClient, private authService: AuthUserService) {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      this.user = +storedUserId;
    }
  }

  addFavorite(id: number): void {
    this.authService.userId$.subscribe((userId) => {
      this.user = userId;
    });
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
    this.authService.userId$.subscribe((userId) => {
      this.user = userId;
    });
    const url = `${this.url}/favorite/check?userId=${this.user}&recipeId=${recipeId}`;
    return this.http.get<boolean>(url, {});
  }

  addComment(recipeId: number, comment: string, rating: number) {
    const url = `${this.url}/reviews`;
    this.authService.userId$.subscribe((userId) => {
      this.user = userId;
    });
    const data = {
      user: { id: this.user },
      recipe: { id: recipeId },
      comment: comment,
      rating: rating,
    };
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
