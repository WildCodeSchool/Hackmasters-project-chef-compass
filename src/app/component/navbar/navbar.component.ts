import { Component } from '@angular/core';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from '../../services/recipies/recipes.service';
import {Router} from "@angular/router";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faBars = faBars;
  searchQuery = '';
  constructor(private recipesService: RecipesService , private router :Router) {}

  searchRecipes(): void {
    this.recipesService.setSearchQuery(this.searchQuery);
    this.recipesService.loadRecipes(this.searchQuery);
    this.router.navigate(['/recipes']);
  }
}
