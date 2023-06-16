import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipies/recipes.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  recipe: any;
  routeSubscription!: Subscription;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const recipeName = params.get('name');
      this.recipesService.getRecipeByName(recipeName!).subscribe((recipe: any) => {
        this.recipe = recipe;
      });
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
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