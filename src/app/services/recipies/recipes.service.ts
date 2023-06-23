import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { Recipe } from '../../models/recipe.model';
import { Recipes } from '../../models/recipes.model';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const DESSERT_CATEGORY = 'Dessert';
const MAIN_DISH_CATEGORY = 'MainDish';
const APPETIZER_CATEGORY = 'Appetizer';
const BREAKFAST_CATEGORY = 'Breakfast';
const SIDE_DISH_CATEGORY = 'SideDish';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private recipesUrl = '../../assets/data/recipes.json';

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
    return this.http.get<Recipe[]>(this.recipesUrl);
  }

  getAllRecipes(): Observable<Recipe[]> {
    return this.getRecipes();
  }

  getRecipeByName(nameId: string): Observable<any> {
    return this.getAllRecipes().pipe(
      map((recipes) => recipes.find((recipe) => recipe.recipe_name.toLowerCase() === nameId.toLowerCase()))
    );
  }

  getRecipeById(id: number): Observable<any> {
    return this.getAllRecipes().pipe(map((recipes) => recipes.find((recipe) => recipe.recipe_id === id)));
  }

  getRecipeByCategory(category: string): Observable<Recipe[]> {
    return this.getAllRecipes().pipe(
      map((recipes) => recipes.filter((recipe) => recipe.recipe_type.toLowerCase() === category.toLowerCase()))
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
  loadRecipes(): void {
    const dessertRecipes$ = this.getRecipeByCategory(DESSERT_CATEGORY);
    const mainDishRecipes$ = this.getRecipeByCategory(MAIN_DISH_CATEGORY);
    const appetizerRecipes$ = this.getRecipeByCategory(APPETIZER_CATEGORY);
    const breakfastRecipes$ = this.getRecipeByCategory(BREAKFAST_CATEGORY);
    const sideDishRecipes$ = this.getRecipeByCategory(SIDE_DISH_CATEGORY);

    forkJoin([dessertRecipes$, mainDishRecipes$, appetizerRecipes$, breakfastRecipes$, sideDishRecipes$]).subscribe(
      ([desserts, mainDishes, appetizers, breakfasts, sideDishes]) => {
        this.recipes.desserts = desserts;
        this.recipes.mainDishes = mainDishes;
        this.recipes.appetizers = appetizers;
        this.recipes.breakfasts = breakfasts;
        this.recipes.sideDishes = sideDishes;
      }
    );
  }
  updateRecipes(updatedRecipes: Recipes): void {
    this.recipes = updatedRecipes;
    this.recipesSubject.next(this.recipes);
  }
}
