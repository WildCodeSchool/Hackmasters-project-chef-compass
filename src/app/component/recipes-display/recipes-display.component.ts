import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, HostListener, OnChanges } from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { Recipes } from 'src/app/models/modelRecipe/recipes.model';

@Component({
  selector: 'app-recipesdisplay',
  templateUrl: './recipes-display.component.html',
  styleUrls: ['./recipes-display.component.scss'],
})
export class RecipesdisplayComponent implements OnInit, OnChanges {
  @Input() recipes!: Recipes;
  haveFavorites = this.userService.favoriteRecipes.length > 0;

  translateValueDesserts = 0;
  translateValueDessertsReverse = 0;
  translateValueMainDishes = 0;
  translateValueMainDishesReverse = 0;
  translateValueAppetizers = 0;
  translateValueAppetizersReverse = 0;
  translateValueBreakfasts = 0;
  translateValueBreakfastsReverse = 0;
  translateValueSideDishes = 0;
  translateValueSideDishesReverse = 0;
  translateValue = 0;
  currentRoute = this.route.snapshot.routeConfig!.path;

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private userService: UsersService,
    private router: Router
  ) {}
  isPageLoaded = false;

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
        if ("/favourites" === url) {
          location.reload();

        }
      }
    })
    this.onResize({ event: null });
    setTimeout(() => {
      this.isPageLoaded = true;
    }, 2000);
    if (this.screenWidth < 768) {
      this.translateValue = -175;
    } else {
      this.translateValue = -275;
    }
    this.updateTranslateValues();
    this.recipesService.searchQuery$.subscribe(() => {
      this.updateTranslateValues();
    });
  }
  ngOnChanges(): void {
    this.updateTranslateValues();
  }

  updateTranslateValues(): void {
      this.translateValueSideDishes =
        this.recipes?.sideDishes?.length * 275 > this.screenWidth ? this.translateValue : 0;
      this.translateValueSideDishesReverse = 0;
      this.translateValueAppetizers =
        this.recipes?.appetizers?.length * 275 > this.screenWidth ? this.translateValue : 0;
      this.translateValueAppetizersReverse = 0;
      this.translateValueBreakfasts =
        this.recipes?.breakfasts?.length * 275 > this.screenWidth ? this.translateValue : 0;
      this.translateValueBreakfastsReverse = 0;
      this.translateValueMainDishes =
        this.recipes?.mainDishes?.length * 275 > this.screenWidth ? this.translateValue : 0;
      this.translateValueMainDishesReverse = 0;
      this.translateValueDesserts = this.recipes?.desserts?.length * 275 > this.screenWidth ? this.translateValue : 0;
      this.translateValueDessertsReverse = 0;

  }

  screenWidth!: number;
  @HostListener('window:resize', ['$event'])
  onResize({ event }: { event: any }) {
    this.screenWidth = window.innerWidth;
  }

  async move(recipe: string, direction: number) {
    const translateValue = 0;
    let recipeList;

    // Mapping the recipe categories to their respective variables
    if (recipe === 'desserts') {
      recipeList = this.recipes.desserts;
    } else if (recipe === 'mainDishes') {
      recipeList = this.recipes.mainDishes;
    } else if (recipe === 'appetizers') {
      recipeList = this.recipes.appetizers;
    } else if (recipe === 'breakfasts') {
      recipeList = this.recipes.breakfasts;
    } else if (recipe === 'sideDishes') {
      recipeList = this.recipes.sideDishes;
    } else {
      return
    }

    if (direction > 0) {
      const lastCard = recipeList[recipeList.length - 1];
      recipeList.pop();
      this.changeValue(recipe, this.translateValue);
      recipeList.unshift(lastCard);
    } else {

      const firstCard = recipeList[0];
      recipeList.shift();
      this.changeValue(recipe, this.translateValue * -1);
      recipeList.push(firstCard);
    }
  }
  changeValue(recipe: string, translateValue: number) {
    if (recipe === 'desserts') {
      this.translateValueDesserts += translateValue;
      this.translateValueDessertsReverse = (this.translateValueDesserts + this.translateValue * -1) * -1;
    } else if (recipe === 'mainDishes') {
      this.translateValueMainDishes += translateValue;
      this.translateValueMainDishesReverse = (this.translateValueMainDishes + this.translateValue * -1) * -1;
    } else if (recipe === 'appetizers') {
      this.translateValueAppetizers += translateValue;
      this.translateValueAppetizersReverse = (this.translateValueAppetizers + this.translateValue * -1) * -1;
    } else if (recipe === 'breakfasts') {
      this.translateValueBreakfasts += translateValue;
      this.translateValueBreakfastsReverse = (this.translateValueBreakfasts + this.translateValue * -1) * -1;
    } else if (recipe === 'sideDishes') {
      this.translateValueSideDishes += translateValue;
      this.translateValueSideDishesReverse = (this.translateValueSideDishes + this.translateValue * -1) * -1;
    }
  }
}
