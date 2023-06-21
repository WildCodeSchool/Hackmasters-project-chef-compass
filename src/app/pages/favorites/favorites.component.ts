import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteRecipes: any;
  private favoriteUpdateSubscription!: Subscription;

  constructor(private recipesService: RecipesService, private userService: UsersService) {}

  ngOnInit(): void {
    this.loadFavoriteRecipes();
    this.favoriteUpdateSubscription = this.userService.favoriteUpdate$.subscribe(() => {
      this.loadFavoriteRecipes();

    });
    
  }

  ngOnDestroy(): void {
    this.favoriteUpdateSubscription.unsubscribe();
  }

  async loadFavoriteRecipes(): Promise<void> {
    await this.recipesService.loadRecipes();
    const allRecipes = this.recipesService.recipes;
    this.favoriteRecipes = {
      desserts: allRecipes.desserts.filter((recipe: any) => this.userService.favoriteRecipes.includes(recipe.recipe_id)),
      mainDishes: allRecipes.mainDishes.filter((recipe: any) => this.userService.favoriteRecipes.includes(recipe.recipe_id)),
      appetizers: allRecipes.appetizers.filter((recipe: any) => this.userService.favoriteRecipes.includes(recipe.recipe_id)),
      breakfasts: allRecipes.breakfasts.filter((recipe: any) => this.userService.favoriteRecipes.includes(recipe.recipe_id)),
      sideDishes: allRecipes.sideDishes.filter((recipe: any) => this.userService.favoriteRecipes.includes(recipe.recipe_id))
    };
  }
}
