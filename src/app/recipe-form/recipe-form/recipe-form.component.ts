import { Component, Inject, Input, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countries from 'countries-list';
import { Recipe } from './recipe.model';
import { Subject } from 'rxjs';
import { ErrorModalComponent } from 'src/app/error-modal/error-modal/error-modal.component';
import { SuccessModalComponent } from 'src/app/success-modal/succes-modal/succes-modal.component';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnDestroy {
  isFormSubmitted = false;
  errorMessage: string = '';
  recipe: Recipe = new Recipe();
  recipeForm!: FormGroup;
  countriesList: any[] = Object.values(countries);
  dishOptions: string[] = ['Dish', 'Dessert', 'Starter', 'Aperitif'];
  budgetOptions: string[] = ['Low', 'Medium', 'High'];
  errorSubject = new Subject<string>();

  constructor(
    private router: Router,
    @Inject(MatDialog) private dialog: any,
    public recipeService: RecipesService,
    private formBuilder: FormBuilder
  ) {
    this.loadCountries();

    this.errorSubject.subscribe(errorMessage => {
      const dialogRef = this.dialog.open(ErrorModalComponent);
      dialogRef.componentInstance.setMessage(errorMessage);
    });

    this.recipeForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      typeOfDish: ['', Validators.required],
      budget: ['', Validators.required],
      country: ['', Validators.required],
      prepTime: ['', Validators.required],
      cookTime: ['', Validators.required],
      allergens: ['', Validators.required],
      diet: ['', Validators.required],
      steps: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.recipeForm.invalid) {
      this.markFormGroupTouched(this.recipeForm);
      const errorMessage = 'Please fill in all the fields in the form';
      this.errorSubject.next(errorMessage);
      return;
    }
  
    if (this.recipeService.modalOpen$.pipe(take(1))) {
      // Ne pas définir isFormSubmitted à true si la fenêtre d'erreur est ouverte
      return;
    }
  
    this.isFormSubmitted = true;
  
    try {
      await this.recipeService.saveRecipe(this.recipe).toPromise();
      this.router.navigate(['/recipes']);
      this.dialog.open(SuccessModalComponent, {
        data: { message: 'Recipe added successfully' },
      });
    } catch (error) {
      console.error('POST request error:', error);
      const errorMessage = 'An error occurred while saving the recipe.';
      this.errorSubject.next(errorMessage);
  
      const dialogRef = this.dialog.open(ErrorModalComponent);
      dialogRef.componentInstance.setMessage(errorMessage);
    }
  }
  

  ngOnDestroy() {
    this.errorSubject.unsubscribe();
  }

  onCancel() {
    this.recipeForm.reset();
    
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Vérifier le type de fichier
      const fileType = file.type;
      if (fileType === 'image/jpeg' || fileType === 'image/png' || fileType === 'video/mp4') {
        // Vérifier la taille du fichier
        const fileSize = file.size;
        const maxSize = 1024 * 1024 * 1024; // 1 GB
        if (fileSize <= maxSize) {
          // Effectuer des opérations avec le fichier
          console.log('Nom du fichier:', file.name);
          console.log('Type de fichier:', fileType);
          console.log('Taille du fichier:', fileSize);
        } else {
          this.errorMessage = 'Erreur : La taille du fichier dépasse 1 GB.';
        }
      } else {
        this.errorMessage = 'Erreur : Type de fichier non pris en charge.';
      }
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.recipeForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched || this.isFormSubmitted)) : false;
  }
  

  private loadCountries() {
    this.countriesList = Object.values(countries.countries);
  }

  // Fonction utilitaire pour marquer tous les champs d'un formulaire comme "touchés"
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  openErrorModal() {
    this.recipeService.openModal();
  }

}
