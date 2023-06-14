import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DemoPageComponent } from './pages/demo/demo.component';
import { DemoComponent } from './components/demo/demo.component';
import { DemoPipe } from './pipes/demo.pipe';
import { DemoDirective } from './directives/demo.directive';
<<<<<<< HEAD
import { FooterComponent } from './footer/footer.component';
import { AboutComponent } from './about/about.component';
import { CommunityComponent } from './community/community.component';
=======
import { NavbarComponent } from './navbar/navbar.component';
import { HomepageComponent } from './homepage/homepage.component';
>>>>>>> origin/navbar


@NgModule({
<<<<<<< HEAD
  declarations: [
    AppComponent,
    DemoPageComponent,
    DemoComponent,
    DemoPipe,
    DemoDirective,
    FooterComponent,
    AboutComponent,
    CommunityComponent,
  ],

=======
  declarations: [AppComponent, DemoPageComponent, DemoComponent, DemoPipe, DemoDirective, HomepageComponent, NavbarComponent],
>>>>>>> origin/navbar
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
