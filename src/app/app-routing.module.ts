import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllrecipesComponent } from './allrecipes/allrecipes.component';

const routes: Routes = [{ path: 'recipes', component: AllrecipesComponent, pathMatch: 'full' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  ROUTES = routes;
}
