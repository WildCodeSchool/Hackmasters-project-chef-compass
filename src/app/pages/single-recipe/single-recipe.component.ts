import { Component, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  data?: any;

  constructor(private recipesService: RecipesService) {}
  recipes: any[] = [];
  recipe: any;  

  ngOnInit() {
    this.recipesService.getRecipies().subscribe(
      (data: any[]) => {
        this.recipes = data;
        this.recipe = this.recipes[15];
        // Affichez les données dans la console pour vérifier
        console.log(this.recipes);

      },
      (error) => {
        console.error('Une erreur s\'est produite lors du chargement des recettes :', error);
      }
    );
  }
  calculateTotalTime(recipe: any): string {
    const prepTime = this.extractTimeInMinutes(recipe.prep_time);
    const cookTime = this.extractTimeInMinutes(recipe.cook_time);
  
    let totalTime = prepTime + cookTime;
    let totalTimeDisplay = '';
  
    if (totalTime >= 60) {
      const hours = Math.floor(totalTime / 60);
      const minutes = totalTime % 60;
      if (minutes === 0) {
        totalTimeDisplay = `${hours} hour(s)`;
      } else {
        totalTimeDisplay = `${hours} hour(s) ${minutes} minute(s)`;
      }
    } else {
      totalTimeDisplay = `${totalTime} minute(s)`;
    }
  
    return totalTimeDisplay;
  }
  
  extractTimeInMinutes(timeString: string): number {
    if (timeString.includes('hour')) {
      const hours = parseInt(timeString.split(' ')[0], 10);
      return hours * 60;
    } else {
      return parseInt(timeString.split(' ')[0], 10);
    }
  }
  getPriceSymbol(price: number): string {
    if (price <= 15) {
      return '€';
    } else if (price <= 25) {
      return '€€';
    } else if (price <= 35) {
      return '€€€';
    } else  {
      return '€€€€';
    } 
  }
  
}  