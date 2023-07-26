import { Injectable } from '@angular/core';
import { Allergen } from '../../models/modelRecipe/Allergen.model';
import { forkJoin, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Country } from '../../models/modelRecipe/Country.model';
import { Diet } from '../../models/modelRecipe/Diet.model';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  searchUrl = 'http://localhost:3000';

  getMultipleSearch(): Observable<any[]> {
    const country = this.http.get<Country[]>(`${this.searchUrl}/countries`);
    const allergens = this.http.get<Allergen[]>(`${this.searchUrl}/allergens`);
    const diets = this.http.get<Diet[]>(`${this.searchUrl}/diets`);

    return forkJoin([country, allergens, diets]);
  }
}
