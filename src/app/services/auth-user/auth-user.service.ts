import { EventEmitter, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject, catchError, throwError } from 'rxjs';
import { Users } from 'src/app/models/modelRecipe/Users.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  private isResetPasswordFormVisible = false;

  userId$: Observable<number> = this.userIdSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalService: BsModalService,
    private tokenService: TokenService
  ) {}

  showResetPasswordForm(): void {
    this.isResetPasswordFormVisible = true;
  }

  registerUser(email: string, password: string, firstname: string): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/users/create`, { email, password, firstname })
      .pipe(catchError(this.handleError));
  }

  checkIfEmailExists(email: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/auth/check-email`, { email });
  }

  sendPasswordResetEmail(email: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/auth/reset-password`, { email });
  }

  resetPassword(email: string, resetToken: string, password: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/auth/reset-password`, { email, resetToken, password });
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
      const id = response?.id;
      this.loginSuccessEvent.emit(userFirstName);
      this.tokenService.setToken(authToken);
      this.setLoggedInUserFirstName(userFirstName);
      this.userId = id;
      this.userIdSubject.next(id);
      this.saveUserCredentials(response.email, response.password, userFirstName, id);
      this.userFirstNameSubject.next(userFirstName);
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
  saveUserCredentials(email: string, password: string, userFirstName: string, id: string): void {
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
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
