import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipesService } from 'src/app/services/recipies/recipes.service';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent {
  @Input() message!: string;

  constructor(
    public dialogRef: MatDialogRef<ErrorModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipeService: RecipesService
  ) {}

  setMessage(message: string) {
    this.message = message;
  }

  closeModal(): void {
    this.dialogRef.close();
    this.recipeService.closeModal(); // Appel de la méthode closeModal() du service RecipesService
  }
}
