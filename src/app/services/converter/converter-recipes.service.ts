import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConverterRecipesService {

  constructor() { }

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
  getFormattedRecipeName(recipe:string) {
    return recipe.replace(/-/g, ' ');
  }
}
