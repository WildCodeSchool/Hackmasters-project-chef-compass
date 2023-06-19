import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private apiUrl = 'https://www.themealdb.com/api/json/v1/' + environment.apiKey;

  constructor(private http: HttpClient) {}

  getRecipes(query: string): Observable<any> {
    const url = `${this.apiUrl}/search.php?s=${encodeURIComponent(query)}`;
    return this.http.get(url)
  }
}
