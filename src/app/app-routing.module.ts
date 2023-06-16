import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DemoPageComponent } from './pages/demo/demo.component';

const routes: Routes = 
[

  
  {path: 'about', component: AboutComponent},
  { path: '', component: HomepageComponent }, 
  { path: '', component: DemoPageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}


