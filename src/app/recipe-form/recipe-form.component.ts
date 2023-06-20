import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { SuccessModalComponent } from '../success-modal/success-modal.component';
import { ErrorModalComponent } from '../error-modal/error-modal.component';
import { countries } from 'countries-list';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent {
  recipe: any = {
    typeOfDish: '',
    name: '',
    country: '',
    prepTime: null,
    cookTime: null,
    allergens: '',
    diet: '',
    steps: '',
  };
  recipeForm: FormGroup;
  countriesList: any[] = [];
  dishOptions: string[] = ['Dish', 'Dessert', 'Starter', 'Aperitif'];
  budgetOptions: string[] = ['Low', 'Medium', 'High'];

  constructor(
    private router: Router,
    @Inject(MatDialog) private dialog: any,
    private recipeService: RecipesService,
    private formBuilder: FormBuilder
  ) {
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

    this.loadCountries();
  }

  async onSubmit() {
    if (this.recipeForm.invalid) {
      this.markFormGroupTouched(this.recipeForm);
      this.errorMessage = 'Please fill in all the fields in the form';

      const dialogRef = this.dialog.open(ErrorModalComponent);
      dialogRef.componentInstance.setMessage(this.errorMessage);

      return;
    }

    try {
      await this.recipeService.saveRecipe(this.recipe).toPromise();
      this.router.navigate(['/recipes']);
      this.dialog.open(SuccessModalComponent, {
        data: { message: 'Recipe added successfully' },
      });
    } catch (error) {
      console.error('POST request error:', error);
      this.errorMessage = 'An error occurred while saving the recipe.';

      const dialogRef = this.dialog.open(ErrorModalComponent);
      dialogRef.componentInstance.setMessage(this.errorMessage);
    }
  }

  onCancel() {
    this.recipeForm.reset();
  }

  errorMessage = '';

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
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  private loadCountries() {
    this.countriesList = Object.values(countries);
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
}
