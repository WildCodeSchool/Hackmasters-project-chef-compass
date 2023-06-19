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

  constructor(private http: HttpClient,
              private recipesService :RecipesService  ) {}

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
    });

  }

  
}

