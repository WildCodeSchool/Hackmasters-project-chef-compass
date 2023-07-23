import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  animationComplete = false;

  constructor(private router: Router) {}

  onAnimationComplete() {
    this.animationComplete = true;
    this.navigateToRecipes();
  }

  private navigateToRecipes() {
    if (this.animationComplete) {
      this.router.navigate(['/recipes']);
    }
  }
}
