import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../../models/modelRecipe/User.model'; // Assurez-vous d'importer le modèle User
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private modalService: BsModalService, public authUserService: AuthUserService ) {}

  login(email: string, password: string): Observable<User> {
    // Modifiez le type de retour pour renvoyer un objet User
    const loginData = { email, password };
    return this.http.post<User>(`${this.baseUrl}/auth/login`, loginData).pipe(
      tap((user: User) => {
        localStorage.setItem('accessToken', user.token); // Stocke le token de l'utilisateur dans le local storage
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/'); // Redirect to the homepage (localhost:4200) after logout
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
