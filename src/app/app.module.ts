import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';

import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';





  declarations: [AppComponent, DemoPageComponent, DemoComponent, DemoPipe, DemoDirective,NavbarComponent, HomepageComponent, SingleRecipeComponent,AboutComponent ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
