import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as countries from 'countries-list';
import { Subject } from 'rxjs';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { take } from 'rxjs/operators';
import { ErrorModalComponent } from 'src/app/component/error-modal/error-modal.component';
import { SuccessModalComponent } from 'src/app/component/success-modal/success-modal.component';
import { Recipe } from 'src/app/models/modelRecipe/recipe.form.model';
import { Allergen } from '../../models/modelRecipe/Allergen.model';
import { Diet } from '../../models/modelRecipe/Diet.model';
import { Country } from '../../models/modelRecipe/Country.model';
import { SearchService } from '../../services/search/search.service';
import { Category } from '../../models/modelRecipe/Category.model';
import { AddRecipesServicesService } from '../../services/AddRecipes/add-recipes-services.service';
import { imgValidator } from './Validators/img.Validators';
import { minArrayLength } from './Validators/minArrayLength.validators';
import { forbiddenCharactersValidator } from './Validators/Characters.validators';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit, OnDestroy {
  isFormSubmitted = false;
  errorMessage = '';
  recipe: Recipe = new Recipe();
  recipeForm!: FormGroup;
  errorSubject = new Subject<string>();
  countries!: Country[];
  allergensData!: Allergen[];
  allergensList: number[] = [];
  dietsData!: Diet[];
  dietsList: number[] = [];
  categories!: Category[];
  newIngredientValue!: string;
  newQuantityValue!: string;
  get steps(): FormArray {
    return this.recipeForm.get('steps') as FormArray;
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  ngOnInit(): void {
    this.addRecipeService.getMultipleQuery().subscribe(([country, allergen, diet, categories]) => {
      this.countries = country;
      this.allergensData = allergen;
      this.dietsData = diet;
      this.categories = categories;
    });
  }

  constructor(
    private router: Router,
    @Inject(MatDialog) private dialog: any,
    public recipeService: RecipesService,
    private formBuilder: FormBuilder,
    private addRecipeService: AddRecipesServicesService
  ) {
    this.errorSubject.subscribe((errorMessage) => {
      const dialogRef = this.dialog.open(ErrorModalComponent);
      dialogRef.componentInstance.setMessage(errorMessage);
    });

    this.recipeForm = this.formBuilder.group({
      names: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          forbiddenCharactersValidator(/[\#$%&()*+,./:;<=>?@\[\\\]^_`{|}~]/),
        ],
      ],
      categories: ['', Validators.required],
      country: ['', Validators.required],
      prepTime: [''],
      cookTime: [''],
      budget: [''],
      allergens: this.formBuilder.array([]),
      diets: this.formBuilder.array([]),
      description: ['', [Validators.required, Validators.minLength(50)]],
      ingredients: this.formBuilder.array([], minArrayLength(3)),
      steps: this.formBuilder.array([], minArrayLength(3)),
      picture: ['', [Validators.required, imgValidator]],
    });
  }

  addStep(step: string): void {
    this.steps.push(this.formBuilder.control(step, Validators.required));
  }

  removeStep(index: number): void {
    this.steps.removeAt(index);
  }

  addIngredient(ingredient: string, quantity: string): void {
    this.ingredients.push(
      this.formBuilder.group({
        ingredient: [ingredient, [Validators.required]],
        quantity: [quantity, [Validators.required]],
      })
    );
    this.newIngredientValue = '';
    this.newQuantityValue = '';
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }
  get allergens(): FormArray {
    return this.recipeForm.get('allergens') as FormArray;
  }

  get diets(): FormArray {
    return this.recipeForm.get('diets') as FormArray;
  }

  addAllergen(allergenId: number): void {
    if (!this.allergens.value.includes(allergenId)) {
      this.allergens.push(this.formBuilder.control(allergenId));
    }
  }

  removeAllergen(index: number): void {
    this.allergens.removeAt(index);
  }

  addDiet(dietId: number): void {
    if (!this.diets.value.includes(dietId)) {
      this.diets.push(this.formBuilder.control(dietId));
    }
  }

  removeDiet(index: number): void {
    this.diets.removeAt(index);
  }

  async onSubmit() {
    if (this.recipeForm.invalid) {
      this.markFormGroupTouched(this.recipeForm);
      const errorMessage = 'Please fill in all the fields in the form';
      this.errorSubject.next(errorMessage);
      return;
    }
    this.recipeForm.value.cookTime = Number(this.recipeForm.value.cookTime) || 0;
    this.recipeForm.value.prepTime = Number(this.recipeForm.value.prepTime) || 0;
    this.recipeForm.value.budget = Number(this.recipeForm.value.budget) || 0;
    this.isFormSubmitted = true;

    try {
      await this.addRecipeService.createRecipe(this.recipeForm.value);
      this.isFormSubmitted = false;
      const dialogRef = this.dialog.open(SuccessModalComponent, {
        data: { message: ' has been successfully saved !' ,component: 'Recipe'},
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      dialogRef.close();
      await new Promise((resolve) => setTimeout(resolve, 500));
      this.router.navigate([`/recipes/${this.recipeForm.value.names.toLowerCase().replace(/\s/g, '-')}`]);
    } catch (error) {
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
