import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { Recipes } from 'src/app/models/recipes.model';


@Component({
  selector: 'app-recipesdisplay',
  templateUrl: './recipes-display.component.html',
  styleUrls: ['./recipes-display.component.scss']
})
export class RecipesdisplayComponent implements OnInit {
  @Input() recipes!: Recipes;
  haveFavorites = this.userService.favoriteRecipes.length > 0;


  translateValueDesserts = -275;
  translateValueMainDishes = -275;
  translateValueAppetizers = -275;
  translateValueBreakfasts = -275;
  translateValueSideDishes = -275;
  currentRoute = this.route.snapshot.routeConfig!.path;

  constructor(private http: HttpClient,
              private recipesService: RecipesService,
              private route: ActivatedRoute,
              private userService: UsersService) {
  }
  isPageLoaded = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isPageLoaded = true;
    },2000);
  }

  async move(recipe: string, direction: number) {
    let translateValue = 0;
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
      console.error("Invalid recipe category");
      return;
    }

    if (direction > 0) {
      const lastCard = recipeList[recipeList.length - 1];
      recipeList.pop();
      this.changeValue(recipe, -275);
      recipeList.unshift(lastCard);
    } else { // Scroll left
      const firstCard = recipeList[0];
      recipeList.shift();
      this.changeValue(recipe, 275);
      recipeList.push(firstCard);
    }

  }
  changeValue(recipe:String,translateValue:number){
    if (recipe === 'desserts') {
      this.translateValueDesserts += translateValue;
    } else if (recipe === 'mainDishes') {
      this.translateValueMainDishes += translateValue;
    } else if (recipe === 'appetizers') {
      this.translateValueAppetizers += translateValue;
    } else if (recipe === 'breakfasts') {
      this.translateValueBreakfasts += translateValue;
    } else if (recipe === 'sideDishes') {
      this.translateValueSideDishes += translateValue;
    }

  }

}

