import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
})
export class CreateUserModalComponent implements OnInit, OnDestroy {
  isCreateModal = false;
  userForm!: FormGroup;
  errorMessage = '';
  emailExists = false;
  showResetPasswordForm = false;
  resetPasswordSuccess = false;
  resetPasswordEmail = '';
  resetPasswordErrorMessage: string | undefined;

  constructor(
    public bsModalRef: BsModalRef,
    private authUserService: AuthUserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.isCreateModal = this.authUserService.isCreatedIn();
    // Initialize the userForm with the required form controls
    this.userForm = this.formBuilder.group({
      firstname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onClose(): void {
    // Hide the modal
    this.bsModalRef.hide();
  }

  ngOnDestroy(): void {}

  onRegisterSubmit(): void {
    const { firstname, email, password } = this.userForm.value;

    if (password !== this.userForm.get('confirmPassword')?.value) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.checkIfEmailExists(email);
  }

  checkIfEmailExists(email: string): void {
    const emailControl = this.userForm.get('email');

    if (emailControl) {
      email = emailControl.value;
      this.authUserService.checkIfEmailExists(email).subscribe(
        (exists: boolean) => {
          this.emailExists = exists;
          if (exists) {
            this.errorMessage = 'A user with the provided email already exists.';
          } else {
            this.authUserService
              .registerUser(email, this.userForm.get('password')?.value, this.userForm.get('firstname')?.value)
              .subscribe(
                (response: any) => {
                  console.log('New user created successfully!', response);
                  this.bsModalRef.hide();
                },
                (error: any) => {
                  console.error('Error while creating user:', error);
                  this.errorMessage = 'An error occurred while creating the user.';
                }
              );
          }
        },
        (error: any) => {
          console.error('Error while checking email existence:', error);
          this.emailExists = false; // Assuming email doesn't exist to proceed with registration
          this.errorMessage = 'An error occurred while checking email existence.';
        }
      );
    }
  }

  onResetPasswordSubmit(): void {
    if (this.resetPasswordEmail) {
      this.authUserService.resetPassword(this.resetPasswordEmail).subscribe(
        (response: any) => {
          console.log('Mot de passe réinitialisé avec succès !', response);
          this.resetPasswordErrorMessage = '';
          this.resetPasswordSuccess = true;
        },
        (error: any) => {
          console.error('Erreur lors de la réinitialisation du mot de passe:', error);
          this.resetPasswordErrorMessage = 'Une erreur est survenue lors de la réinitialisation du mot de passe';
        }
      );
    } else {
      this.resetPasswordErrorMessage = 'An error occurred while resetting the password';
    }
  }

  // Méthode pour vérifier si l'e-mail est valide
  isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  // Méthode pour gérer le clic sur le bouton "Mot de passe oublié ?"
  onForgotPassword(): void {
    // Afficher le formulaire de réinitialisation du mot de passe
    this.showResetPasswordForm = true;
  }
}
