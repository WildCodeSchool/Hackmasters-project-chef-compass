import { Component, EventEmitter, OnInit } from '@angular/core';
import { faMagnifyingGlass, faBars, faUser } from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from '../../services/recipies/recipes.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { Country } from '../../models/modelRecipe/Country.model';
import { Allergen } from '../../models/modelRecipe/Allergen.model';
import { Diet } from '../../models/modelRecipe/Diet.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/modelRecipe/User.model';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loginSuccess: EventEmitter<User> = new EventEmitter<User>(); // Ajoutez cette ligne

  faMagnifyingGlass = faMagnifyingGlass;
  faBars = faBars;
  faUser = faUser;
  searchQuery = '';
  bsModalRef?: BsModalRef;

  countries!: Country[];
  countriesList: string[] = [];
  selectedCountries = '';
  allergens!: Allergen[];
  allergensList: string[] = [];
  selectedAllergens = '';
  diets!: Diet[];
  dietsList: string[] = [];
  selectedDiets = '';
  showNav = false;

  constructor(
    private recipesService: RecipesService,
    private searchService: SearchService,
    private router: Router,
    private modalService: BsModalService,
    private authUserService: AuthUserService
  ) {}

  ngOnInit(): void {
    this.searchService.getMultipleSearch().subscribe(([country, allergen, diet]) => {
      this.countries = country;
      this.allergens = allergen;
      this.diets = diet;
    });
  }
  onLoginSuccess(user: User) {
    console.log('User logged in:', user);
  }

  openLoginModal() {
    // Utilisez le service BsModalService pour ouvrir la fenêtre modale
    this.bsModalRef = this.modalService.show(LoginModalComponent, { class: 'modal-lg' });

    // Vérifier si modalRef.content est défini avant de souscrire
    if (this.bsModalRef.content) {
      // Souscrire à l'événement loginSuccess
      this.bsModalRef.content.loginSuccess.subscribe((user: User) => {
        // Vous pouvez gérer le succès de la connexion ici et effectuer des actions supplémentaires si nécessaire,
        // par exemple, mettre à jour l'interface utilisateur pour indiquer que l'utilisateur est connecté.

        // Émettre l'événement loginSuccess pour informer d'autres composants que l'utilisateur s'est connecté avec succès
        this.loginSuccess.emit(user);
      });
    }
  }

  toggleNav() {
    this.showNav = !this.showNav;
  }

  searchRecipes(): void {
    const url = `countryNames=${this.countriesList.join(',')}&allergenNames=${this.allergensList.join(
      ','
    )}&dietNames=${this.dietsList.join(',')}`;
    this.recipesService.setSearchQuery(this.searchQuery);
    this.recipesService.loadRecipes(this.searchQuery, url);
    this.router.navigate(['/recipes']);
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

  allergensSelected(allergens: string) {
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
