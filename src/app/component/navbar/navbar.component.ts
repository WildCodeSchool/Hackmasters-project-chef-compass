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
  showNav = false;

  constructor(private recipesService: RecipesService, private searchService: SearchService, private router: Router) {
    this.selectedCountries = '';
    this.selectedAllergens = '';
    this.selectedDiets = '';
  }
  toggleNav() {
    this.showNav = !this.showNav;
  }

  searchRecipes(): void {
    const url = `countryNames=${this.countriesList.join(',')}&allergenNames=${this.allergensList.join(',')}&dietNames=${this.dietsList.join(',')}`
    this.recipesService.setSearchQuery(this.searchQuery);
    this.recipesService.loadRecipes(this.searchQuery, url);
    this.router.navigate(['/recipes']);
  }
  ngOnInit(): void {
    this.searchService.getMultipleSearch().subscribe(([country, allergen, diet]) => {
      this.countries = country;
      this.allergens = allergen;
      this.diets = diet;
    });
  }
  countriesSelected(countries: string) {
    const index = this.countriesList.indexOf(countries);
    if (index !== -1) {
      this.countriesList.splice(index, 1);
    } else {
      this.countriesList.push(countries);
    }
    this.searchRecipes();
    console.log(this.countriesList);
  }

  allergensSelected(allergens:string) {
    const index = this.allergensList.indexOf(allergens);
    if (index !== -1) {
      this.allergensList.splice(index, 1);
    } else {
      this.allergensList.push(allergens);
    }
    console.log(this.allergensList);
    this.searchRecipes();
  }

  dietsSelected(diet: string) {
    const index = this.dietsList.indexOf(diet);
    if (index !== -1) {
      this.dietsList.splice(index, 1);
    } else {
      this.dietsList.push(diet);
    }
    console.log(this.dietsList);
    this.searchRecipes();
  }
}
