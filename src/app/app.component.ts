import { Component, HostListener, OnInit } from '@angular/core';
import { User } from 'src/app/models/modelRecipe/User.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isNavbarAbove = false;
  isLoginModalVisible = false; // Add a boolean variable to track the visibility of the login modal

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

  // Implement the onLoginSuccess method to handle login success event
  onLoginSuccess(user: User) {
    // You can handle the login success event here, e.g., display a welcome message, update the UI, etc.
    console.log('Login successful:', user);

    // Hide the login modal after successful login
    this.isLoginModalVisible = false;
  }

  // Show the login modal
  showLoginModal() {
    this.isLoginModalVisible = true;
  }

  updateNavbarPosition() {
    this.isNavbarAbove = window.innerWidth > 768;
  }
}
