// create-user-modal.component.ts
import { Component } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
})
export class CreateUserModalComponent {
  userForm: any = {
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  errorMessage = '';
  showResetPasswordForm = false;
  resetPasswordSuccess = false;
  resetPasswordEmail = '';
  showRegisterForm = false;
  isCreateModalVisible = false;

  constructor(public bsModalRef: BsModalRef, private authUserService: AuthUserService) {}

  someFunction() {
    // Définir la propriété showRegisterForm sur true pour afficher la deuxième fenêtre modale
    this.showRegisterForm = true;
  }

  // Définition de la méthode pour soumettre le formulaire d'enregistrement
  onRegisterSubmit(): void {
    const { firstname, email, password } = this.userForm;

    // Check if the passwords match
    if (password !== this.userForm.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    // Call the service to create a new user
    this.authUserService.registerUser(email, password, firstname).subscribe(
      (response: any) => {
        console.log('New user created successfully!', response);
        // Hide the modal after user creation
        this.bsModalRef.hide();
      },
      (error: any) => {
        console.error('Error while creating user:', error);
        this.errorMessage = error.message;
      }
    );
  }

  onClose(): void {
    this.showResetPasswordForm = false;
    this.resetPasswordSuccess = false;
    // Hide the modal
    this.bsModalRef.hide();
  }

  onForgotPassword(): void {
    // Show the password reset form
    this.authUserService.showResetPasswordForm();
  }
}
