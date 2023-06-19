import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CorsInterceptor } from './interceptor/cors.interceptor';

import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './pages/about/about.component';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { FormsModule } from '@angular/forms';

import { FooterComponent } from './footer/footer.component';;


  @NgModule({
  
  declarations: [AppComponent,NavbarComponent, HomepageComponent, SingleRecipeComponent,AboutComponent,FooterComponent ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule,HttpClientModule, FormsModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CorsInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
