import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';

const routes: Routes = [

  { path: '', component: HomepageComponent },
  { path: 'recipe/:name', component: SingleRecipeComponent} 
  ];

  
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
