import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, tap, Subject } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Recipe } from '../../models/modelRecipe/recipe.model';
import { Recipes } from '../../models/modelRecipe/recipes.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const DESSERT_CATEGORY = 'Desserts';
const MAIN_DISH_CATEGORY = 'MainDishes';
const APPETIZER_CATEGORY = 'Appetizers';
const BREAKFAST_CATEGORY = 'Breakfasts';
const SIDE_DISH_CATEGORY = 'SideDishes';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesUrl = 'http://localhost:8080/recipes';

  public recipes: Recipes = {
    desserts: [],
    mainDishes: [],
    appetizers: [],
    breakfasts: [],
    sideDishes: [],
  };

  constructor(private http: HttpClient) {
    this.loadRecipes();
  }
  recipesSubject: BehaviorSubject<Recipes> = new BehaviorSubject<Recipes>(this.recipes);

  private modalOpenSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  modalOpen$ = this.modalOpenSubject.asObservable();

  private searchQuerySubject: Subject<string> = new Subject<string>();
  searchQuery$ = this.searchQuerySubject.asObservable();

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(catchError(this.handleError));
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.getRecipes();
  }

  getRecipeBySlug(slug: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipesUrl}/${slug}`).pipe(catchError(this.handleError));
  }

  getRecipeById(id: number): Observable<any> {
    return this.getAllRecipes().pipe(map((recipes) => recipes.find((recipe) => recipe.id === id)));
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
  loadRecipes(query = '', param = ''): void {
    const dessertRecipes$ = this.http.get<Recipe[]>(
      `${this.recipesUrl}/search?categoryNames=${DESSERT_CATEGORY}&query=${query}&${param}`
    );
    const mainDishRecipes$ = this.http.get<Recipe[]>(
      `${this.recipesUrl}/search?categoryNames=${MAIN_DISH_CATEGORY}&query=${query}&${param}`
    );
    const appetizerRecipes$ = this.http.get<Recipe[]>(
      `${this.recipesUrl}/search?categoryNames=${APPETIZER_CATEGORY}&query=${query}&${param}`
    );
    const breakfastRecipes$ = this.http.get<Recipe[]>(
      `${this.recipesUrl}/search?categoryNames=${BREAKFAST_CATEGORY}&query=${query}&${param}`
    );
    const sideDishRecipes$ = this.http.get<Recipe[]>(
      `${this.recipesUrl}/search?categoryNames=${SIDE_DISH_CATEGORY}&query=${query}&${param}`
    );

    forkJoin([dessertRecipes$, mainDishRecipes$, appetizerRecipes$, breakfastRecipes$, sideDishRecipes$])
      .pipe(
        tap(([desserts, mainDishes, appetizers, breakfasts, sideDishes]) => {
          this.recipes.desserts = desserts;
          this.recipes.mainDishes = mainDishes;
          this.recipes.appetizers = appetizers;
          this.recipes.breakfasts = breakfasts;
          this.recipes.sideDishes = sideDishes;
        })
      )
      .subscribe();
    console.log(param);
  }

  setSearchQuery(query: string): void {
    this.searchQuerySubject.next(query);
  }

  resetParam(): void {
    this.loadRecipes();
  }
}
