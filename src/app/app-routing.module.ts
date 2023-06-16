import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
=======

import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { CommunityComponent } from './community/community.component';
>>>>>>> fcdad5e548750008ad55aa0ec3af0e2f3a3c4915
import { AllrecipesComponent } from './allrecipes/allrecipes.component';

const routes: Routes = [{ path: 'recipes', component: AllrecipesComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  ROUTES = routes;
}
