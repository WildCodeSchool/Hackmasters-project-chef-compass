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
  @Output() loginSuccess: EventEmitter<User> = new EventEmitter<User>(); // Modifiez le type de retour pour émettre un objet User

  // Constructeur avec les services AuthUserService et TokenService
  constructor(private authUserService: AuthUserService, private tokenService: TokenService) {}

  ngOnInit(): void {
    // Initialisation
  }

  // Méthode pour gérer la soumission du formulaire de connexion
  onSubmit(): void {
    // Appelez la méthode login du service AuthUserService pour gérer le processus de connexion
    this.authUserService.login(this.email, this.password).subscribe(
      (user: User) => {
        // Gérez le succès de la connexion ici, par exemple, en émettant l'événement loginSuccess
        this.loginSuccess.emit(user);
      },
      (error) => {
        // Gérer l'erreur de connexion ici
        console.error('Login failed:', error);
      }
    );
  }
  // Autres méthodes...
}
