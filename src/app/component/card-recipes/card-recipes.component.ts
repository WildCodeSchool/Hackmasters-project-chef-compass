import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { ConverterRecipesService } from 'src/app/services/converter/converter-recipes.service';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { UsersService } from 'src/app/services/users/users.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import  { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { Recipe } from 'src/app/models/modelRecipe/recipe.model';
@Component({
  selector: 'app-card-recipes',
  templateUrl: './card-recipes.component.html',
  styleUrls: ['./card-recipes.component.scss']
})
export class CardRecipesComponent {
  @Input() recipe!: Recipe;
  constructor( public converter : ConverterRecipesService
    ,public userService : UsersService
    , public recipeService :RecipesService) {}
  faStar = faStar;
  faStarSolid = faStarSolid;
}
