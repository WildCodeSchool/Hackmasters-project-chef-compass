// create-user-modal.component.ts
import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import {MatDialog} from "@angular/material/dialog";
import {SuccessModalComponent} from "../success-modal/success-modal.component";

@Component({
  selector: 'app-create-user-modal',
  templateUrl: './create-user-modal.component.html',
  styleUrls: ['./create-user-modal.component.scss'],
})
export class CreateUserModalComponent  {
  isCreateModal = false;
  userForm: any = {
    firstname: '',
    email: '',
    password: '',
    confirmPassword: '',
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
    private modalService: BsModalService,
    private dialog: MatDialog
  ) {}

  isValidEmail(email: string): boolean {
    return true;
  }

  onRegisterSubmit(): void {
    const { firstname, email, password } = this.userForm;

    if (password !== this.userForm.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authUserService.registerUser(email, password, firstname).subscribe(
      (response: any) => {
        this.bsModalRef.hide();
        let dialogRef = this.dialog.open(SuccessModalComponent, {
          data: { message: 'created successfully!' ,component: 'User'}
        });
        setTimeout(() => {
          dialogRef.close();
        }, 3000);
      },
      (error: any) => {
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
    this.authUserService.showResetPasswordForm();
  }

  onResetPasswordSubmit(): void {
    if (!this.isValidEmail(this.userForm.resetPasswordEmail)) {
      this.resetPasswordErrorMessage = 'invalid email';
      return;
    }

    this.authUserService.resetPassword(this.userForm.resetPasswordEmail).subscribe(
      (response: any) => {
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
