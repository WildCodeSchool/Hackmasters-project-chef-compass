import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Subscription } from 'rxjs';
import { Recipes } from 'src/app/models/modelRecipe/recipes.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent implements OnInit, OnDestroy {
  favoriteRecipes!: Recipes;
  private favoriteUpdateSubscription!: Subscription;

  constructor(private recipesService: RecipesService, private userService: UsersService) {}

  ngOnInit(): void {
    this.loadFavoriteRecipes();
    this.favoriteUpdateSubscription = this.userService.favoriteUpdate$.subscribe(() => {
      this.loadFavoriteRecipes();
    });
  }

  loadFavoriteRecipes(): void {
    this.userService.loadFavoriteRecipes();
    this.favoriteRecipes = this.userService.getFavoriteRecipes();
  }
  ngOnDestroy(): void {
    this.favoriteUpdateSubscription.unsubscribe();
    this.recipesService.resetParam(); // reset param when component is destroyed
  }
}
