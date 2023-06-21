import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, filter, map } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesUrl =  '../../assets/data/recipes.json'; 

  constructor( private http : HttpClient,
              )
 {
    this.loadRecipes();

      
   }
  getRecipes():Observable<any[]>{
    return this.http.get<any[]>(this.recipesUrl);
  }
  getAllRecipes(): Observable<any[]> {
    return this.getRecipes();
  }

  getRecipeByName(nameId: string): Observable<any> {

    return this.getAllRecipes().pipe(
      map(recipes => recipes.find(recipe => recipe.recipe_name.toLowerCase() === nameId.toLowerCase()))
    );
  }
  getRecipeById(Id: number): Observable<any> {

    return this.getAllRecipes().pipe(
      map(recipes => recipes.find(recipe => recipe.recipe_id === Id))
    );
  }
  getRecipeByCategory(typeId: string): Observable<any[]> {

    return this.getAllRecipes().pipe(
      map(recipes => recipes.filter(recipe => recipe.recipe_type.toLowerCase() === typeId.toLowerCase()))
    );
  }
  public recipes: any ={
    desserts: [],
    mainDishes: [],
    appetizers: [],
    breakfasts: [],
    sideDishes: []
  };


   

   loadRecipes(): void {
    this.getRecipeByCategory('Dessert').subscribe((recipes: any[]) => {
      this.recipes.desserts = recipes;


    });

    this.getRecipeByCategory('MainDish').subscribe((recipes: any[]) => {
      this.recipes.mainDishes = recipes;

    });

    this.getRecipeByCategory('Appetizer').subscribe((recipes: any[]) => {
      this.recipes.appetizers = recipes;

    });

    this.getRecipeByCategory('Breakfast').subscribe((recipes: any[]) => {
      this.recipes.breakfasts = recipes;
  
    });

    this.getRecipeByCategory('SideDish').subscribe((recipes: any[]) => {
      this.recipes.sideDishes = recipes;;
    });
  }

}




