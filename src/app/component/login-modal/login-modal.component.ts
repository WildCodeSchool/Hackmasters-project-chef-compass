import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { User } from 'src/app/models/modelRecipe/User.model';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';

@Component({
  selector: 'app-login-modal',
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent implements OnInit {
  email = '';
  password = '';
  isLoggedIn = false;

  @Output() loginSuccess: EventEmitter<User> = new EventEmitter<User>();

  constructor(public bsModalRef: BsModalRef, private authUserService: AuthUserService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authUserService.isLoggedIn();
  }

  onSubmit(): void {
    this.authUserService.login(this.email, this.password).subscribe(
      (user: User) => {
        this.loginSuccess.emit(user);
        this.bsModalRef.hide();
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
