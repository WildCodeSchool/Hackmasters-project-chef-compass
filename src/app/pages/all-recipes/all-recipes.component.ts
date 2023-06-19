import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent {
  desserts: any[] = [];
  mainDishes: any[] = [];
  appetizers: any[] = [];
  breakfasts: any[] = [];
  sideDishes: any[] = [];
  translateValueDesserts = 0;
  translateValueMainDishes = 0;
  translateValueAppetizers = 0;
  translateValueBreakfasts = 0;
  translateValueSideDishes = 0;


  

  constructor(private http: HttpClient,
              private recipesService :RecipesService  ) {}
              moveLeft(recipe: string) {
                if (recipe === 'desserts') {
                  this.translateValueDesserts -= 100; // Adjust the value according to your needs
                } else if (recipe === 'mainDishes') {
                  this.translateValueMainDishes -= 100;
                } else if (recipe === 'appetizers') {
                  this.translateValueAppetizers -= 100;
                } else if (recipe === 'breakfasts') {
                  this.translateValueBreakfasts -= 100;
                } else if (recipe === 'sideDishes') {
                  this.translateValueSideDishes -= 100;
                }
              }
              
              moveRight(recipe: string) {
                if (recipe === 'desserts') {
                  this.translateValueDesserts += 100; // Adjust the value according to your needs
                } else if (recipe === 'mainDishes') {
                  this.translateValueMainDishes += 100;
                } else if (recipe === 'appetizers') {
                  this.translateValueAppetizers += 100;
                } else if (recipe === 'breakfasts') {
                  this.translateValueBreakfasts += 100;
                } else if (recipe === 'sideDishes') {
                  this.translateValueSideDishes += 100;
                }
              }

  ngOnInit(): void {
    this.recipesService.getRecipeByCategory('Dessert').subscribe((recipes: any[]) => {
      this.desserts = recipes;
      console.log(this.desserts); 
    });

    this.recipesService.getRecipeByCategory('MainDish').subscribe((recipes: any[]) => {
      this.mainDishes = recipes;
    });

    this.recipesService.getRecipeByCategory('Appetizer').subscribe((recipes: any[]) => {
      this.appetizers = recipes;
    });

    this.recipesService.getRecipeByCategory('Breakfast').subscribe((recipes: any[]) => {
      this.breakfasts = recipes;
    });
    this.recipesService.getRecipeByCategory('SideDish').subscribe((recipes: any[]) => {  
      this.sideDishes = recipes;
      console.log(this.sideDishes);
    });

  }

  
}

