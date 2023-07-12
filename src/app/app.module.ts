import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';

import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';
import { CardRecipesComponent } from './component/card-recipes/card-recipes.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { HttpClientModule } from '@angular/common/http';


import { FooterComponent } from './component/footer/footer.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipesdisplayComponent } from './component/recipes-display/recipes-display.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { SuccessModalComponent } from './component/success-modal/success-modal.component';
import { ErrorModalComponent } from './component/error-modal/error-modal.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LucideAngularModule, Utensils, ChefHat, Star, Plus } from 'lucide-angular';
import { FirstWordDirective } from './Directive/first-word-directive.directive';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SingleRecipeComponent,
    AboutComponent,
    FooterComponent,
    CardRecipesComponent,
    AllRecipesComponent,
    FavoritesComponent,
    RecipesdisplayComponent,
    RecipeFormComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    FirstWordDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LucideAngularModule.pick({ Utensils, ChefHat, Star, Plus,})
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
