import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  decodeToken(token: string): Token {
    return jwt_decode(token);
  }
}

export { Token };
