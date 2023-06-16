import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesUrl =  '../../assets/data/recipes.json'; 

  constructor( private http : HttpClient) { }
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
}