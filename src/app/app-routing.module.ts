import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';;
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';

const routes: Routes = 
[
  { path: '', component: HomepageComponent }, 
  { path: 'recipe', component: AllRecipesComponent},
  { path: 'recipe/:name', component: SingleRecipeComponent},
  {path: 'about', component: AboutComponent}
  ];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  ROUTES = routes;
}
