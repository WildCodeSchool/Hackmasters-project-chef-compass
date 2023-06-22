import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeFormComponent } from './recipe-form.component';
import { ReactiveFormsModule } from '@angular/forms'; 
import { ErrorModalComponent } from 'src/app/error-modal/error-modal/error-modal.component';


@NgModule({
  declarations: [
    RecipeFormComponent,
    ErrorModalComponent 
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule 
  ]
})
export class RecipeFormModule { }
