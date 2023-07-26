import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DeleteRecipeService {
  constructor(private http: HttpClient) {}

  url = 'http://localhost:8080';

  deleteById(id: number) {
    return this.http.delete(`${this.url}/recipes/${id}`);
  }
  deleteAdditionalById(id: number) {
    return this.http.delete(`${this.url}/recipes/additional/${id}`);
  }
}
