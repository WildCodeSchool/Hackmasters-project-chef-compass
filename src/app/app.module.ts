import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
import { AboutComponent } from './pages/about/about.component';


@NgModule({
  declarations: [AppComponent, DemoPageComponent, DemoComponent, DemoPipe, DemoDirective, AboutComponent],
import { HomepageComponent } from './homepage/homepage.component';

@NgModule({
  declarations: [AppComponent, DemoPageComponent, DemoComponent, DemoPipe, DemoDirective, AboutComponent, HomepageComponent],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
