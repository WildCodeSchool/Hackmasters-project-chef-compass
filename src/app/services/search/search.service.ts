import { Injectable } from '@angular/core';
import { Allergen } from '../../models/modelRecipe/Allergen.model';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../models/modelRecipe/Country.model';
import { Diet } from '../../models/modelRecipe/Diet.model';
//import { Users } from 'src/app/models/modelRecipe/Users.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchUrl = 'http://localhost:3000/recipes';

  getMultipleSearch(): Observable<any[]> {
    const country = this.http.get<Country[]>(`${this.searchUrl}/countries`);
    const allergens = this.http.get<Allergen[]>(`${this.searchUrl}/allergens`);
    const diets = this.http.get<Diet[]>(`${this.searchUrl}/diets`);
    //const firstname = this.http.get<Users[]>(`${this.searchUrl}/users`);

    return forkJoin([country, allergens, diets]);
  }
}
