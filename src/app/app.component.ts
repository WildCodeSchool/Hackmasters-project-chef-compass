import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/models/modelRecipe/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isNavbarAbove = false;
  isLoginModalVisible = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    this.updateNavbarPosition();
  }

  ngOnInit(): void {
    this.updateNavbarPosition();
  }

  searchQuery = '';

  onSearchQueryChanged(query: string): void {
    this.searchQuery = query;
  }

  onLoginSuccess(user: User) {
    this.isLoginModalVisible = false;
  }

  showLoginModal() {
    this.isLoginModalVisible = true;
  }

  updateNavbarPosition() {
    this.isNavbarAbove = window.innerWidth > 768;
  }
}
