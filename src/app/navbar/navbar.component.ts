import { Component } from '@angular/core';
import { APIService } from '../services/API/api.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  query!: string;

  constructor(private apiService: APIService) {}


  ngOnInit(): void { }

  searchRecipes(query: string): void {
    this.apiService.getRecipes(query).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}

