import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RecipiesService {
  private recipiesUrl =  '../../assets/data/recipies.json'; 

  constructor( private http : HttpClient) { }
  getRecipies():Observable<any[]>{
    return this.http.get<any[]>(this.recipiesUrl);
    
  }
}
