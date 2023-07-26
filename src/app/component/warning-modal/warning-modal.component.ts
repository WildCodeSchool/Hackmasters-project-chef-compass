import { Component, Inject, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss'],
})
export class WarningModalComponent {
  @Input() message!: string;

  constructor(public dialogRef: MatDialogRef<WarningModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  closeModal(): void {
    this.dialogRef.close(false);
  }
  confirmModal(): void {
    this.dialogRef.close(true);
  }
}
