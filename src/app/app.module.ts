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
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
