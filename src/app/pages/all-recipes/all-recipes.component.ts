import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit,} from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrls: ['./all-recipes.component.scss']
})
export class AllRecipesComponent implements OnInit {
recipes:any 

  constructor( private recipesService: RecipesService, ) {}
  
  ngOnInit(): void {
    
    this.recipes = this.recipesService.recipes;
    
  }



  
}

