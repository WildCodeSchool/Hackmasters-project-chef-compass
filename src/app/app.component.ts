import { Component, HostListener, OnInit } from '@angular/core';
import { Users } from 'src/app/models/modelRecipe/Users.model';
import { LoginModalComponent } from './component/login-modal/login-modal.component';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isNavbarAbove = false;
  isLoginModalVisible = false;

  constructor(private modalService: BsModalService) {}

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.updateNavbarPosition();
  }

  ngOnInit(): void {
    this.updateNavbarPosition();
    this.updateNavbarPosition();
  }

  searchQuery = '';

  onSearchQueryChanged(query: string): void {
    this.searchQuery = query;
  }

  showLoginModal(): void {
    this.modalService.show(LoginModalComponent, {
      initialState: {},
    });
  }

  updateNavbarPosition() {
    this.isNavbarAbove = window.innerWidth > 768;
  }
}
