import { Component } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
})
export class ResetPasswordFormComponent {
  resetPasswordEmail = '';
  resetPasswordSuccess = false;
  resetPasswordErrorMessage = '';

  constructor(private authUserService: AuthUserService) {}

  onResetPasswordSubmit(): void {
    this.authUserService.resetPassword(this.resetPasswordEmail).subscribe(
      () => {
        this.resetPasswordSuccess = true;
        this.resetPasswordErrorMessage = '';
      },
      (error: { message: string }) => {
        this.resetPasswordSuccess = false;
        this.resetPasswordErrorMessage = error.message;
      }
    );
  }
}
