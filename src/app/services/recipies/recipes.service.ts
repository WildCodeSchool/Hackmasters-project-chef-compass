import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesUrl =  '../../assets/data/recipes.json'; 

  constructor( private http : HttpClient) { }
  getRecipies():Observable<any[]>{
    return this.http.get<any[]>(this.recipesUrl);
    
  }
}
