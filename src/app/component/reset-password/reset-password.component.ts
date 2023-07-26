import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  resetForm!: FormGroup;
  errorMessage: string | undefined;
  cardUuid: string;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private authUserService: AuthUserService,
    public bsModalRef: BsModalRef
  ) {
    this.cardUuid = '';
  }

  ngOnInit(): void {
    this.resetForm = this.formBuilder.group({
      email: ['', Validators.required],
      resetToken: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    const sub = this.route.params.subscribe((params: Params) => {
      this.cardUuid = params['id'];
      console.log(this.cardUuid);
    });
  }

  onResetSubmit() {
    const { email, resetToken, password, confirmPassword } = this.resetForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.authUserService.resetPassword(email, resetToken, password).subscribe(
      () => {
        console.log('Password reset successful!');
        this.bsModalRef.hide();
      },
      (error: { message: string }) => {
        console.error('Error while resetting password:', error.message);
        this.errorMessage = error.message;
      }
    );
  }
}
