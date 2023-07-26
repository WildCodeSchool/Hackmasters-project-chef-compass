import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { CreateUserModalComponent } from '../create-user-modal/create-user-modal.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit, OnDestroy {
  private loginSuccessSubscription: Subscription;
  isLoggedIn = false;

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    public bsModalRef: BsModalRef,
    public authUserService: AuthUserService,
    private modalService: BsModalService
  ) {
    this.loginSuccessSubscription = new Subscription();
  }

  showCreateModal(): void {
    this.modalService.show(CreateUserModalComponent, {
      initialState: {},
    });
  }

  someFunction() {
    this.authUserService.showResetPasswordForm();
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authUserService.isLoggedIn();
  }
  ngOnDestroy(): void {
    this.loginSuccessSubscription.unsubscribe();
  }

  onSubmit(): void {
    this.authUserService.login(this.email, this.password).subscribe(
      (response: any) => {
        const authToken = response?.authToken;
        if (authToken) {
          this.authUserService.onLoginSuccess(response);
          this.bsModalRef.hide();
        }
      },
      (error: any) => {
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

  onForgotPassword(): void {
    this.authUserService.showResetPasswordForm();
  }
}
