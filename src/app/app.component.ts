import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isNavbarAbove: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event){
    this.isNavbarAbove = window.innerWidth > 768;
  }
}
