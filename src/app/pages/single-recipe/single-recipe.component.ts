import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { ConverterRecipesService } from 'src/app/services/converter/converter-recipes.service';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss']
})
export class SingleRecipeComponent implements OnInit {
  recipe: any;
  routeSubscription!: Subscription;

  constructor(private recipesService: RecipesService, private route: ActivatedRoute ,
    public converter : ConverterRecipesService)  {}

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

  
}  