import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';
import { CardRecipesComponent } from './component/card-recipes/card-recipes.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { FooterComponent } from './footer/footer.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form/recipe-form/recipe-form.component';
import { ErrorModalComponent } from './error-modal/error-modal/error-modal.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipesdisplayComponent } from './component/recipes-display/recipes-display.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
    RecipeFormComponent,
    ErrorModalComponent,
    RecipesdisplayComponent,
    FavoritesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    FontAwesomeModule
  ],

  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
