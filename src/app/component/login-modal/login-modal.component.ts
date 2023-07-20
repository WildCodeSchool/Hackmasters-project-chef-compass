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
  @Output() loginSuccess: EventEmitter<User> = new EventEmitter<User>();

  // Constructeur avec le service AuthUserService
  constructor(public bsModalRef: BsModalRef, private authUserService: AuthUserService) {}

  ngOnInit(): void {}

  // Méthode pour gérer la soumission du formulaire de connexion
  onSubmit(): void {
    // Appelez la méthode login du service AuthUserService pour gérer le processus de connexion
    this.authUserService.login(this.email, this.password).subscribe(
      (user: User) => {
        // Gérez le succès de la connexion ici, par exemple, en émettant l'événement loginSuccess
        this.loginSuccess.emit(user);

        // Fermez la fenêtre modale après la connexion réussie
        this.bsModalRef.hide();
      },
      (error) => {
        // Gérer l'erreur de connexion ici
        console.error('Login failed:', error);
      }
    );
  }
}
