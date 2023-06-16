import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from './Recipe.interface';

@Component({
  selector: 'app-allrecipes',
  templateUrl: './allrecipes.component.html',
  styleUrls: ['./allrecipes.component.scss'],
})
export class AllrecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  dishRecipes: Recipe[] = [];
  dessertRecipes: Recipe[] = [];
  starterRecipes: Recipe[] = [];
  aperitifRecipes: Recipe[] = [];
  @ViewChild('carouselContainer', { static: true }) carouselContainer!: ElementRef;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      const response = await this.http.get<any>('assets/recipes.json').toPromise();
      if (Array.isArray(response.recipes)) {
        this.recipes = response.recipes;
        this.dishRecipes = response.recipes.filter((recipe: Recipe) => recipe.category && recipe.category.dish);
        this.dessertRecipes = response.recipes.filter((recipe: Recipe) => recipe.category && recipe.category.dessert);
        this.starterRecipes = response.recipes.filter((recipe: Recipe) => recipe.category && recipe.category.starter);
        this.aperitifRecipes = response.recipes.filter((recipe: Recipe) => recipe.category && recipe.category.aperitif);
      } else {
        console.error('Invalid response format:', response);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  }
  scrollLeft(container: ElementRef) {
    const carouselContainer = container.nativeElement;
    if (carouselContainer) {
      carouselContainer.scrollBy({
        left: -400,
        behavior: 'smooth',
      });
    }
  }

  scrollRight(container: ElementRef) {
    const carouselContainer = container.nativeElement;
    if (carouselContainer) {
      carouselContainer.scrollBy({
        left: 400,
        behavior: 'smooth',
      });
    }
  }
}
