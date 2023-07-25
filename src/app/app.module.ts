import { NgModule, RendererFactory2 } from '@angular/core';
import { BrowserModule, ɵDomRendererFactory2 } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { LucideAngularModule, Utensils, ChefHat, Star, Plus, User } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { SingleRecipeComponent } from './pages/single-recipe/single-recipe.component';
import { AboutComponent } from './pages/about/about.component';
import { FooterComponent } from './component/footer/footer.component';
import { CardRecipesComponent } from './component/card-recipes/card-recipes.component';
import { AllRecipesComponent } from './pages/all-recipes/all-recipes.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { RecipesdisplayComponent } from './component/recipes-display/recipes-display.component';
import { RecipeFormComponent } from './pages/recipe-form/recipe-form.component';
import { SuccessModalComponent } from './component/success-modal/success-modal.component';
import { ErrorModalComponent } from './component/error-modal/error-modal.component';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { WarningModalComponent } from './component/warning-modal/warning-modal.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { TokenService } from './services/token/token.service';
import { AuthInterceptor } from './services/auth-interceptor.service';
import { LogoAndGreetingComponent } from './component/logo-and-greeting/logo-and-greeting.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomepageComponent,
    SingleRecipeComponent,
    AboutComponent,
    FooterComponent,
    CardRecipesComponent,
    AllRecipesComponent,
    FavoritesComponent,
    RecipesdisplayComponent,
    RecipeFormComponent,
    ErrorModalComponent,
    SuccessModalComponent,
    LoginModalComponent,
    WarningModalComponent,
    NotfoundComponent,
    LogoAndGreetingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    LucideAngularModule.pick({ Utensils, ChefHat, Star, Plus, User }),
    CommonModule,
    MatButtonModule,
    MatInputModule,
    NoopAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    BsModalService,
    { provide: RendererFactory2, useClass: ɵDomRendererFactory2 },
    TokenService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
