import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  private apiUrl = 'https://api.edamam.com/api/recipes/v2'

  constructor(private http: HttpClient) {}

  getRecipes(query: string): Observable<any> {
    const url = `${this.apiUrl}/typehead?q=${encodeURIComponent(query)}`;
    const headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': ''
    });
    return this.http.get(url, { headers })
  }
}
