import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { concat, Subscription } from 'rxjs';
import { RecipesService } from 'src/app/services/recipies/recipes.service';
import { ConverterRecipesService } from 'src/app/services/converter/converter-recipes.service';
import { faStar, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faStar as faStarSolid, faPlusMinus, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { UsersService } from 'src/app/services/users/users.service';
import { Recipe } from 'src/app/models/modelRecipe/recipe.model';
import { DeleteRecipeService } from '../../services/delete/delete-recipe.service';
import { WarningModalComponent } from '../../component/warning-modal/warning-modal.component';
import { SuccessModalComponent } from '../../component/success-modal/success-modal.component';

@Component({
  selector: 'app-single-recipe',
  templateUrl: './single-recipe.component.html',
  styleUrls: ['./single-recipe.component.scss'],
})
export class SingleRecipeComponent implements OnInit, OnDestroy {
  recipe!: Recipe;
  routeSubscription!: Subscription;
  commentText = '';
  isLoading = true;
  isUserCreateRecipe!: boolean;
  rating = 0;
  tempRating = 0;
  isCommentTooShort = false;
  favorite!: boolean;
  private favoriteSubscription!: Subscription;

  constructor(
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    public converter: ConverterRecipesService,
    public userService: UsersService,
    public deleteService: DeleteRecipeService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }
  ngOnInit(): void {
    this.refresh();
  }
  addFavorite(recipeId: number): void {
    this.userService.addFavorite(recipeId);
    this.favorite = !this.favorite;
  }
  refresh(): void {
    this.routeSubscription = this.route.paramMap.subscribe((params: ParamMap) => {
      const recipeSlug = params.get('name');
      if (recipeSlug) {
        this.recipesService.getRecipeBySlug(recipeSlug).subscribe(
          (recipe: Recipe) => {
            if (recipe) {
              this.recipe = recipe;
              this.isLoading = false;
              this.favoriteSubscription = this.userService.isActive(this.recipe.id).subscribe((isActive) => {
                this.favorite = isActive;
              });
              this.userService.isCreateRecipe(recipe.id).subscribe(
                (isCreated: boolean) => {
                  this.isUserCreateRecipe = isCreated;
                },
                (error) => {
                  console.error(error);
                }
              );
            } else {
              this.router.navigate(['/404']);
            }
          },
          () => {
            this.router.navigate(['/404']);
          }
        );
      } else {
        this.router.navigate(['/404']);
      }
    });
  }

  setTempRating(rating: number, event: any): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const width = rect.right - rect.left;
    this.tempRating = x > width / 2 ? rating : rating - 0.5;
  }

  resetTempRating(): void {
    this.tempRating = this.rating;
  }

  setRating(rating: number, event: any): void {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left;
    const width = rect.right - rect.left;
    this.rating = x > width / 2 ? rating : rating - 0.5;
    this.tempRating = this.rating;
  }

  getStarType(i: number): any {
    if (this.tempRating >= i) {
      return this.faStarSolid;
    } else if (this.tempRating >= i - 0.5) {
      return this.faStarHalf;
    } else {
      return this.faStar;
    }
  }
  getStarTypeForComment(i: number, score: number): any {
    if (score >= i) {
      return this.faStarSolid;
    } else if (score >= i - 0.5) {
      return this.faStarHalf;
    } else {
      return this.faStar;
    }
  }

  deleteRecipe(id: number): void {
    const deleteAdditional$ = this.deleteService.deleteAdditionalById(id);
    const deleteById$ = this.deleteService.deleteById(id);

    concat(deleteAdditional$, deleteById$).subscribe(() => {
      this.router.navigate(['/recipes']).then(() => {
        this.openConfirmationModal();
      });
    });
  }

  openConfirmationModal(): void {
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      data: { message: 'deleted successfully.' },
    });
    setTimeout(() => {
      dialogRef.close();
    }, 4000);
  }

  faStar = faStar;
  faStarSolid = faStarSolid;
  faPlusMinus = faPlusMinus;
  faTrash = faTrashCan;
  faStarHalf = faStarHalfAlt;

  addComment(recipeId: number, comment: string): void {
    if (comment.length < 5) {
      this.isCommentTooShort = true;
    } else {
      this.userService.addComment(recipeId, comment, this.rating).subscribe(
        (response) => {
          this.commentText = '';
          this.rating = 0;
          this.tempRating = 0;
          this.isCommentTooShort = false;
          this.refresh();
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  openWarningModal(): void {
    const dialogRef = this.dialog.open(WarningModalComponent, {
      data: { message: 'Are you sure you want to delete this recipe ?' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteRecipe(this.recipe.id);
      }
    });
  }
}
