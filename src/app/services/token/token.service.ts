import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private tokenKey = 'authToken'; // Clé pour stocker le jeton dans le local storage

  constructor() {}

  // Méthode pour définir le jeton dans le local storage
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  // Méthode pour récupérer le jeton depuis le local storage
  getToken(): string {
    return localStorage.getItem(this.tokenKey) || '';
  }

  // Méthode pour effacer le jeton du local storage
  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
