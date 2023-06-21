import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { ActivatedRoute } from '@angular/router'; 
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-recipesdisplay',
  templateUrl: './recipesdisplay.component.html',
  styleUrls: ['./recipesdisplay.component.scss']
})
export class RecipesdisplayComponent implements OnInit{
  @Input() recipes: any; 
  haveFavorites = this.userService.favoriteRecipes.length > 0;
  

  translateValueDesserts = 0;
  translateValueMainDishes = 0;
  translateValueAppetizers = 0;
  translateValueBreakfasts = 0;
  translateValueSideDishes = 0;

  currentRoute=  this.route.snapshot.routeConfig!.path;
  
  

  constructor(private http: HttpClient,
              private recipesService :RecipesService,
              private route :ActivatedRoute,
              private userService: UsersService ) {
                
          
              } getFavorites() {  
                
              }
  ngOnInit(): void {
      

          }

              moveLeft(recipe: string) {
                if (recipe === 'desserts') {
                  this.translateValueDesserts += 100; 
                } else if (recipe === 'mainDishes') {
                  this.translateValueMainDishes += 100;
                } else if (recipe === 'appetizers') {
                  this.translateValueAppetizers += 100;
                } else if (recipe === 'breakfasts') {
                  this.translateValueBreakfasts += 100;
                } else if (recipe === 'sideDishes') {
                  this.translateValueSideDishes += 100;
                }
              }
              
              moveRight(recipe: string) {
                if (recipe === 'desserts') {
                  this.translateValueDesserts -= 100; 
                } else if (recipe === 'mainDishes') {
                  this.translateValueMainDishes -= 100;
                } else if (recipe === 'appetizers') {
                  this.translateValueAppetizers -= 100;
                } else if (recipe === 'breakfasts') {
                  this.translateValueBreakfasts -= 100;
                } else if (recipe === 'sideDishes') {
                  this.translateValueSideDishes -= 100;
                }
              }
     
  
}
