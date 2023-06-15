import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CommunityComponent } from './community/community.component';
import { AllrecipesComponent } from './allrecipes/allrecipes.component';

const routes: Routes = [
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: 'community', component: CommunityComponent, pathMatch: 'full' },
  { path: 'recipes', component: AllrecipesComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  ROUTES = routes;
}
