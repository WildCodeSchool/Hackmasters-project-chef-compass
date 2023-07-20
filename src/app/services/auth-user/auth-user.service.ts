import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/modelRecipe/User.model'; // Assurez-vous d'importer le modèle User

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<User> {
    // Modifiez le type de retour pour renvoyer un objet User
    const loginData = { email, password };
    return this.http.post<User>(`${this.baseUrl}/auth/login`, loginData).pipe(
      tap((user: User) => {
        localStorage.setItem('accessToken', user.token); // Stockez le token de l'utilisateur dans le local storage
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
