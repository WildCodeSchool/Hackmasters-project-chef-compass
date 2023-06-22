import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';
import { RecipeFormComponent } from './recipe-form/recipe-form/recipe-form.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'recipes', component: AllRecipesComponent },
  { path: 'recipes/:name', component: SingleRecipeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'add-recipe', component: RecipeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  ROUTES = routes;
}
