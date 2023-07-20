import { Injectable } from '@angular/core';
import { RecipesService } from '../recipies/recipes.service';
import { Subject, Observable } from 'rxjs';
import { Recipe } from 'src/app/models/modelRecipe/recipe.model';
import { map, filter, distinctUntilChanged } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  favoriteRecipes: number[] = [];
  createRecipe: number[] = [];
  comments = [
    {
      recipe: 1,
      comment: [
        { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt', score: 0 },
        { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt', score: 0 },
      ],
    },
    {
      recipe: 2,
      comment: [
        { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt', score: 0 },
        { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt', score: 0 },
      ],
    },
    {
      recipe: 3,
      comment: [
        { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt lorem', score: 0 },
        { content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras interdum tincidunt lorem', score: 0 },
      ],
    },
  ];

  // Create a subject to emit updates when favorites change
  private favoriteUpdateSubject = new Subject<void>();
  favoriteUpdate$: Observable<void> = this.favoriteUpdateSubject.asObservable();

  constructor(private recipeService: RecipesService) {}

  getCommentsByRecipeId(recipeId: number) {
    const commentsByRecipe = this.comments.find((c) => c.recipe === recipeId);
    if (commentsByRecipe) {
      return commentsByRecipe.comment;
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

  createRecipeId(id: number): void {
    const index = this.createRecipe.indexOf(id);
    if (index === -1) {
      this.createRecipe.push(id);
    } else {
      this.createRecipe.splice(index, 1);
    }
    console.log(this.createRecipe);
    this.favoriteUpdateSubject.next();
  }

  isCreateRecipe(id: number): boolean {
    return this.createRecipe.indexOf(id) !== -1;
  }

  isActive(id: number): boolean {
    return this.favoriteRecipes.indexOf(id) !== -1;
  }

  addComment(recipeId: number, comment: string ,rating:number): void {
    const recipeComments = this.comments.find((c) => c.recipe === recipeId);
    if (recipeComments) {
      recipeComments.comment.unshift({ content: comment, score: rating });
    } else {
      this.comments.push({ recipe: recipeId, comment: [{ content: comment, score: rating}] });
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
