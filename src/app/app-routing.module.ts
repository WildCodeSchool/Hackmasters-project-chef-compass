import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { DemoPageComponent } from './pages/demo/demo.component';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './homepage/homepage.component';


const routes: Routes = 
[

  { path: 'recipe/:name', component: SingleRecipeComponent} 
  {path: 'about', component: AboutComponent},
  { path: '', component: HomepageComponent }, 
  { path: '', component: DemoPageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


