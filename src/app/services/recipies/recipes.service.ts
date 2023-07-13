import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable, forkJoin, tap} from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { Recipes } from '../../models/recipes.model';
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

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl).pipe(catchError(this.handleError));
  }


  getAllRecipes(): Observable<Recipe[]> {
    return this.getRecipes();
  }

  getRecipeByName(name: string): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.recipesUrl}/${name}`).pipe(catchError(this.handleError));
  }

  getRecipeById(id: number): Observable<any> {
    return this.getAllRecipes().pipe(map((recipes) => recipes.find((recipe) => recipe.id === id)));
  }

  saveRecipe(recipe: any): Observable<any> {

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
  loadRecipes(): void {
    const dessertRecipes$ = this.http.get<Recipe[]>(`${this.recipesUrl}/category?categoryNames=${DESSERT_CATEGORY}`);
    const mainDishRecipes$ = this.http.get<Recipe[]>(`${this.recipesUrl}/category?categoryNames=${MAIN_DISH_CATEGORY}`);
    const appetizerRecipes$ = this.http.get<Recipe[]>(`${this.recipesUrl}/category?categoryNames=${APPETIZER_CATEGORY}`);
    const breakfastRecipes$ = this.http.get<Recipe[]>(`${this.recipesUrl}/category?categoryNames=${BREAKFAST_CATEGORY}`);
    const sideDishRecipes$ = this.http.get<Recipe[]>(`${this.recipesUrl}/category?categoryNames=${SIDE_DISH_CATEGORY}`);

    forkJoin([dessertRecipes$, mainDishRecipes$, appetizerRecipes$, breakfastRecipes$, sideDishRecipes$])
      .pipe(
        tap(([desserts, mainDishes, appetizers, breakfasts, sideDishes]) => {
          this.recipes.desserts = desserts;
          this.recipes.mainDishes = mainDishes;
          this.recipes.appetizers = appetizers;
          this.recipes.breakfasts = breakfasts;
          this.recipes.sideDishes = sideDishes;

          console.log('Desserts:', desserts);
          console.log('Main Dishes:', mainDishes);
          console.log('Appetizers:', appetizers);
          console.log('Breakfasts:', breakfasts);
          console.log('Side Dishes:', sideDishes);
        })
      )
      .subscribe();
  }
  updateRecipes(updatedRecipes: Recipes): void {
    this.recipes = updatedRecipes;
    this.recipesSubject.next(this.recipes);
  }
}
