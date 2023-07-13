import { Injectable } from '@angular/core';
import { RecipesService } from '../recipies/recipes.service';
import { Subject, Observable } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  favoriteRecipes: number[] = [];

  comments = [
    {
      recipe: 1,
      comment: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum',
      ],
    },
    {
      recipe: 2,
      comment: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt',
      ],
    },
    {
      recipe: 3,
      comment: [
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt lorem',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt lorem',
      ],
    },
  ];

  // Create a subject to emit updates when favorites change
  private favoriteUpdateSubject = new Subject<void>();
  favoriteUpdate$: Observable<void> = this.favoriteUpdateSubject.asObservable();

  constructor(private recipeService: RecipesService) {}

  getLatestCommentsByRecipeId(recipeId: number, count: number): string[] {
    const commentsByRecipe = this.comments.find((c) => c.recipe === recipeId);
    if (commentsByRecipe) {
      const latestComments = commentsByRecipe.comment.slice(0, count);
      return latestComments;
    } else {
      return [];
    }
  }
  addFavorite(id: number): void {
    const index = this.favoriteRecipes.indexOf(id);
    if (index === -1) {
      this.favoriteRecipes.push(id);
    } else {
      this.favoriteRecipes.splice(index, 1);
    }
    this.favoriteUpdateSubject.next();
  }

  isActive(id: number): boolean {
    return this.favoriteRecipes.indexOf(id) !== -1;
  }
  addComment(recipeId: number, comment: string): void {
    const recipeComments = this.comments.find((c) => c.recipe === recipeId);
    if (recipeComments) {
      recipeComments.comment.unshift(comment); // Ajoute le commentaire au début du tableau
    } else {
      this.comments.push({ recipe: recipeId, comment: [comment] });
    }
  }

  async loadFavoriteRecipes(): Promise<void> {
    await this.recipeService.loadRecipes();
  }

  getFavoriteRecipes(): any {
    const allRecipes = this.recipeService.recipes;
    return {
      desserts: this.getFilteredRecipes(allRecipes.desserts),
      mainDishes: this.getFilteredRecipes(allRecipes.mainDishes),
      appetizers: this.getFilteredRecipes(allRecipes.appetizers),
      breakfasts: this.getFilteredRecipes(allRecipes.breakfasts),
      sideDishes: this.getFilteredRecipes(allRecipes.sideDishes),
    };
  }

  private getFilteredRecipes(recipes: Recipe[]): Recipe[] {
    return recipes?.filter((recipe: Recipe) => this.favoriteRecipes.includes(recipe.id));
  }
}
