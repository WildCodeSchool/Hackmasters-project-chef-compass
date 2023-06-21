import { Injectable } from '@angular/core';
import { RecipesService } from '../recipies/recipes.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  favoriteRecipes: number[] = [1];

  comments = [
    { recipe: 1, comment: "Commentaire 1" },
    { recipe: 1, comment: "Commentaire 2" },
    { recipe: 2, comment: "Commentaire 3" },
    { recipe: 2, comment: "Commentaire 4" },
    { recipe: 3, comment: "Commentaire 5" }
  ];

  // Create a subject to emit updates when favorites change
  private favoriteUpdateSubject = new Subject<void>();
  favoriteUpdate$ = this.favoriteUpdateSubject.asObservable();

  constructor(public recipeService: RecipesService) {}

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

  getLatestCommentsByRecipeId(recipeId: number, count: number): string[] {
    const commentsByRecipe = this.comments.filter(comment => comment.recipe === recipeId);
    const latestComments = commentsByRecipe.slice(-count).map(comment => comment.comment);
    return latestComments;
  }
  addComment(recipeId: number, comment: string): void {
    this.comments.push({ recipe: recipeId, comment: comment });
  }
}
