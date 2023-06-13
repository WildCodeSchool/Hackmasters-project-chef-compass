import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DemoService {
  findAllLinter() {
    return ['ESlint', 'Prettier'];
  }
}
