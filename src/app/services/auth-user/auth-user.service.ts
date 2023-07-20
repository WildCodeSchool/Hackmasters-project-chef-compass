import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/modelRecipe/User.model';

@Injectable({
  providedIn: 'root',
})
export class AuthUserService {
  private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router, private modalService: BsModalService) {}

  login(email: string, password: string): Observable<User> {
    const loginData = { email, password };
    return this.http.post<User>(`${this.baseUrl}/auth/login`, loginData).pipe(
      tap((user: User) => {
        localStorage.setItem('accessToken', user.token);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    this.router.navigateByUrl('/');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('accessToken');
  }
}
