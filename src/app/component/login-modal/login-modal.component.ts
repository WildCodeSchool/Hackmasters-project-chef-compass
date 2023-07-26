import { Component, OnDestroy, OnInit} from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';
import { Users } from 'src/app/models/modelRecipe/Users.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  private loginSuccessSubscription: Subscription;
  showForgotPasswordButton = false;
  isLoggedIn = false;
  errorMessage = '';
  loginForm!: FormGroup;

  userForm: FormGroup;

  constructor(
    public bsModalRef: BsModalRef,
    public authUserService: AuthUserService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder
  ) {
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.loginSuccessSubscription = new Subscription();
  }

  showCreateModal(): void {
    this.modalService.show(CreateUserModalComponent, {
      initialState: {},
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authUserService.isLoggedIn();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    }

  ngOnDestroy(): void {
    this.loginSuccessSubscription.unsubscribe();
  }

  onSubmit(): void {
    const formData: Users = this.userForm.value;
    this.authUserService.login(formData.email, formData.password).subscribe(
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

  createOpenUser() {
    this.showCreateModal();
    this.onClose();
  }

  loginOpenUser() {
    this.onClose();
  }

  onForgotPassword(): void {
    // You can handle the forgot password functionality here
    console.log('Forgot password clicked.');
    // Show the reset password form
    this.authUserService.showResetPasswordForm();
  }
}
