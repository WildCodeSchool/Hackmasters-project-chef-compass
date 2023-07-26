// create-user-modal.component.ts
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
})
export class CreateUserModalComponent implements OnInit {
  isCreateModal = false;
  userForm: any = {
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Variable pour stocker l'e-mail de réinitialisation du mot de passe
    resetPasswordEmail: '',
  };
  errorMessage = '';
  showResetPasswordForm = false;
  resetPasswordSuccess = false;
  resetPasswordEmail = '';
  showRegisterForm = false;

  resetPasswordErrorMessage: string | undefined;

  constructor(
    public bsModalRef: BsModalRef,
    private authUserService: AuthUserService,
    private modalService: BsModalService
  ) {}

  isValidEmail(email: string): boolean {
    // Ajoutez ici la logique pour valider si l'e-mail est correct
    // Par exemple, vous pouvez utiliser une expression régulière pour la validation de l'e-mail
    return true;
  }

  ngOnInit(): void {
    this.isCreateModal = this.authUserService.isCreatedIn();
  }

  someFunction() {
    this.showRegisterForm = true;
  }

  onRegisterSubmit(): void {
    const { firstname, email, password } = this.userForm;

    if (password !== this.userForm.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

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

  onResetPasswordSubmit(): void {
    if (!this.isValidEmail(this.userForm.resetPasswordEmail)) {
      this.resetPasswordErrorMessage = 'invalid email';
      return;
    }

    this.authUserService.resetPassword(this.userForm.resetPasswordEmail).subscribe(
      (response: any) => {
        console.log('password rest', response);
        setTimeout(() => {
          this.resetPasswordErrorMessage = '';
          this.resetPasswordSuccess = true;
        }, 2000);
      },
      (error: any) => {
        this.resetPasswordErrorMessage = 'error while resetting password';
      }
    );
  }
}
