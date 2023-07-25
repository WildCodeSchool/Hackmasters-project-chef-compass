import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { Users } from 'src/app/models/modelRecipe/Users.model';
import { HttpClient } from '@angular/common/http';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private baseUrl = 'http://localhost:3000';
  private userFirstName = '';
  userId!: number;
  private userIdSubject = new Subject<number>();
  private userFirstNameSubject = new Subject<string>();

  userId$: Observable<number> = this.userIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService,
    private tokenService: TokenService
  ) {}

  // Define the showResetPasswordForm method
  showResetPasswordForm(): void {
    // Implementation here...
  }

  registerUser(email: string, password: string, firstname: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/users/register`, { email, password, firstname });
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/reset-password`, { email });
  }

  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/reset-password`, { email });
  }

  login(email: string, password: string): Observable<Users> {
    return this.http.post<Users>(`${this.baseUrl}/auth/login`, { email, password });
  }

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
      this.loginSuccessEvent.emit(userFirstName);
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
  isCreatedIn(): boolean {
    return !!this.tokenService.getToken();
  }
  saveUserCredentials(email: string, password: string, userFirstName: string): void {
    localStorage.setItem('userEmail', email);
    localStorage.setItem('userPassword', password);
    localStorage.setItem('userFirstName', userFirstName);
    localStorage.setItem('userId', id.toString());
  }

  getUserCredentials(): { email: string; password: string; userFirstName: string } {
    const email = localStorage.getItem('userEmail') || '';
    const password = localStorage.getItem('userPassword') || '';
    const userFirstName = localStorage.getItem('userFirstName') || '';
    return { email, password, userFirstName };
  }

  clearUserCredentials(): void {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
  }
}
