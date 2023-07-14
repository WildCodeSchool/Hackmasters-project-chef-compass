import { Component, OnInit } from '@angular/core';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from '../../services/recipies/recipes.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { Country } from '../../models/modelRecipe/Country.model';
import { Allergen } from '../../models/modelRecipe/Allergen.model';
import { Diet } from '../../models/modelRecipe/Diet.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  faMagnifyingGlass = faMagnifyingGlass;
  faBars = faBars;
  searchQuery = '';

  countries!: Country[];
  countriesList: string[] = [];
  selectedCountries: string;
  allergens!: Allergen[];
  allergensList: string[] = [];
  selectedAllergens: string;
  diets!: Diet[];
  dietsList: string[] = [];
  selectedDiets: string;

  constructor(private recipesService: RecipesService, private searchService: SearchService, private router: Router) {
    this.selectedCountries = '';
    this.selectedAllergens = '';
    this.selectedDiets = '';
  }

  searchRecipes(): void {
    this.recipesService.setSearchQuery(this.searchQuery);
    this.recipesService.loadRecipes(this.searchQuery);
    this.router.navigate(['/recipes']);
  }
  ngOnInit(): void {
    this.searchService.getMultipleSearch().subscribe(([country, allergen, diet]) => {
      this.countries = country;
      this.allergens = allergen;
      this.diets = diet;
    });
  }
  countriesSelected() {
    const index = this.countriesList.indexOf(this.selectedCountries);
    if (index !== -1) {
      this.countriesList.splice(index, 1);
    } else {
      this.countriesList.push(this.selectedCountries);
    }
    console.log(this.countriesList);
  }

  allergensSelected() {
    const index = this.allergensList.indexOf(this.selectedAllergens);
    if (index !== -1) {
      this.allergensList.splice(index, 1);
    } else {
      this.allergensList.push(this.selectedAllergens);
    }
    console.log(this.allergensList);
  }

  dietsSelected() {
    const index = this.dietsList.indexOf(this.selectedDiets);
    if (index !== -1) {
      this.dietsList.splice(index, 1);
    } else {
      this.dietsList.push(this.selectedDiets);
    }
    console.log(this.dietsList);
  }
}
