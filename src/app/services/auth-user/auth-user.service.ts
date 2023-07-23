import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Users } from 'src/app/models/modelRecipe/Users.model';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import jwt_decode from 'jwt-decode';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private baseUrl = 'http://localhost:3000';
  private userFirstName = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService,
    private tokenService: TokenService
  ) {}

  public getUserFirstName(): string {
    return this.userFirstName;
  }

  setLoggedInUserFirstName(firstname: string) {
    this.userFirstName = firstname;
  }

  login(email: string, password: string): Observable<Users> {
    return this.http.post<Users>(`${this.baseUrl}/auth/login`, { email, password });
  }

  loginSuccessEvent: EventEmitter<string> = new EventEmitter<string>();

  onLoginSuccess(response: any) {
    const authToken = response?.authToken;
    if (authToken) {
      const userFirstName = response?.firstname;
      this.loginSuccessEvent.emit(userFirstName); // Émettre l'événement avec le prénom de l'utilisateur
      this.tokenService.setToken(authToken);
      this.setLoggedInUserFirstName(userFirstName);
      this.saveUserCredentials(response.email, response.password, userFirstName);
    } else {
      console.error('Auth token not found in response:', response);
    }
  }

  logout(): void {
    this.tokenService.setToken('');
  }

  isLoggedIn(): boolean {
    return !!this.tokenService.getToken();
  }

  saveUserCredentials(email: string, password: string, userFirstName: string): void {
    // Save user email and password to local storage
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userFirstName', userFirstName);
  }

  getUserCredentials(): { email: string; password: string; userFirstName: string } {
    // Retrieve user email and password from local storage
    const email = localStorage.getItem('userEmail') || '';
    const password = localStorage.getItem('userPassword') || '';
    const userFirstName = localStorage.getItem('userFirstName') || '';
    return { email, password, userFirstName };
  }

  clearUserCredentials(): void {
    // Clear user email and password from local storage
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }
}
