import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/models/modelRecipe/User.model';
import { AuthUserService } from 'src/app/services/auth-user/auth-user.service';
import { Token, TokenService } from 'src/app/services/token/token.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss'],
})
export class UserLoginComponent implements OnInit {
  email = '';
  password = '';
  @Output() loginSuccess: EventEmitter<User> = new EventEmitter<User>();

  constructor(public authUserService: AuthUserService, private tokenService: TokenService) {}

  ngOnInit(): void {
    // Initialization
  }

  onSubmit(): void {
    this.authUserService.login(this.email, this.password).subscribe(
      (user: User) => {
        this.loginSuccess.emit(user);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }

  logout(): void {
    this.authUserService.logout();
  }
}
