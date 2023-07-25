import {Component, EventEmitter, HostListener, OnDestroy, OnInit, Output} from '@angular/core';
import {faMagnifyingGlass, faBars, faUser, faSearch} from '@fortawesome/free-solid-svg-icons';
import { RecipesService } from '../../services/recipies/recipes.service';
import { Router } from '@angular/router';
import { SearchService } from '../../services/search/search.service';
import { Country } from '../../models/modelRecipe/Country.model';
import { Allergen } from '../../models/modelRecipe/Allergen.model';
import { Diet } from '../../models/modelRecipe/Diet.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { Users } from 'src/app/models/modelRecipe/Users.model'; // Import the User interface here
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  email = '';
  password = '';
  responsive!: number;
  faSearch = faSearch;

  userFirstName!: string;
  private loginSuccessSubscription: Subscription;

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
  screenWidth!: number;
  showSearch = false;

  constructor(
    private recipesService: RecipesService,
    private searchService: SearchService,
    private router: Router,
    private modalService: BsModalService,
    public authUserService: AuthUserService
  ) {
    this.loginSuccessSubscription = new Subscription();
    this.screenWidth = window.innerWidth
    const userFirstName = localStorage.getItem('userFirstName');
    if (userFirstName) {
      this.userFirstName = userFirstName;
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize({ event }: { event: any }) {
    this.screenWidth = event.target.innerWidth;
  }

  ngOnInit(): void {
    this.searchService.getMultipleSearch().subscribe(([country, allergen, diet]) => {
      this.countries = country;
      this.allergens = allergen;
      this.diets = diet;
      this.updateUserFirstName();
      this.loginSuccessSubscription = this.authUserService.loginSuccessEvent.subscribe((userFirstName: string) => {
        this.userFirstName = userFirstName;
      });
    });
  }

  private updateUserFirstName(): void {
    const userCredentials = this.authUserService.getUserCredentials();
    this.userFirstName = userCredentials.userFirstName;
  }

  ngOnDestroy(): void {
    this.loginSuccessSubscription.unsubscribe();
  }

  showLoginModal(): void {
    this.modalService.show(LoginModalComponent, {
      initialState: {},
    });
  }

  onLoginSuccess(users: Users): void {
    this.userFirstName = users.firstname;
  }

  logout(): void {
    this.authUserService.logout();
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
  }

  allergensSelected(allergens: string) {
    const index = this.allergensList.indexOf(allergens);
    if (index !== -1) {
      this.allergensList.splice(index, 1);
    } else {
      this.allergensList.push(allergens);
    }
    this.searchRecipes();
  }

  dietsSelected(diet: string) {
    const index = this.dietsList.indexOf(diet);
    if (index !== -1) {
      this.dietsList.splice(index, 1);
    } else {
      this.dietsList.push(diet);
    }
    this.searchRecipes();
  }


  toggleSearch() {
    this.showSearch = !this.showSearch;
  }
}
