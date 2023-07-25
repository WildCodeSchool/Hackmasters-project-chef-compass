import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  isLoggedIn = false;
  email = '';
  password = '';
  errorMessage = '';

  constructor(public bsModalRef: BsModalRef, private authUserService: AuthUserService) {}

  someFunction() {
    // Use the showResetPasswordForm method
    this.authUserService.showResetPasswordForm();
  }
  showCreateModal(): void {
    this.authUserService.showCreateModal();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authUserService.isLoggedIn();
  }

  onSubmit(): void {
    this.authUserService.login(this.email, this.password).subscribe(
      (response: any) => {
        console.log('Response object from backend:', response);
        const authToken = response?.authToken;
        if (authToken) {
          this.authUserService.onLoginSuccess(response);
          this.bsModalRef.hide();
        }
      },
      (error: any) => {
        console.error('Login failed:', error);
        this.errorMessage = 'An error occurred during login. Please try again.';
      }
    );
  }

  onClose(): void {
    this.bsModalRef.hide();
  }

  onForgotPassword(): void {
    // You can handle the forgot password functionality here
    console.log('Forgot password clicked.');
    // Show the reset password form
    this.authUserService.showResetPasswordForm();
  }
}
