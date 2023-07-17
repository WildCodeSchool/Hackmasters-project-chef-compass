import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { ConverterRecipesService } from 'src/app/services/converter/converter-recipes.service';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid , faPlusMinus } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users/users.service';
import { Recipe } from 'src/app/models/modelRecipe/recipe.model';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  recipe!: Recipe;
  routeSubscription!: Subscription;
  commentText: string = '';
  isLoading = true;

  constructor(private recipesService: RecipesService,
    private route: ActivatedRoute ,
    public converter : ConverterRecipesService,
    public userService :UsersService)  {}

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const recipeName = params.get('name');
      if (recipeName) {
        this.recipesService.getRecipeByName(recipeName).subscribe((recipe: Recipe) => {
          this.recipe = recipe;
          console.log(this.recipe);
          this.isLoading = false;

        })
      }
    });
  }


  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }
  faStar = faStar;
  faStarSolid = faStarSolid;
  faPlusMinus = faPlusMinus;

  addComment(recipeId: number, comment: string): void {
    this.userService.addComment(recipeId, comment);
    this.commentText = '';
  }



}
