import { Component, OnDestroy, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ConverterRecipesService } from 'src/app/services/converter/converter-recipes.service';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'src/app/models/modelRecipe/recipe.model';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-card-recipes',
  templateUrl: './card-recipes.component.html',
  styleUrls: ['./card-recipes.component.scss'],
})
export class CardRecipesComponent implements OnInit, OnDestroy {
  @Input() recipe!: Recipe;
  favorite!: boolean;
  private favoriteSubscription!: Subscription;
  constructor(
    public converter: ConverterRecipesService,
    public userService: UsersService,
    public recipeService: RecipesService
  ) {}
  faStar = faStar;
  faStarSolid = faStarSolid;
  ngOnInit(): void {
    this.favoriteSubscription = this.userService.isActive(this.recipe.id).subscribe((isActive) => {
      this.favorite = isActive;
    });
  }
  addFavorite(recipeId: number): void {
    this.userService.addFavorite(recipeId);
    this.favorite = !this.favorite;
  }

  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
  }
}
