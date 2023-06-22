import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isNavbarAbove: boolean = false;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event){
    this.updateNavbarPosition();
  }

  ngOnInit(): void {
    this.updateNavbarPosition();
  }

  updateNavbarPosition() {
    this.isNavbarAbove = window.innerWidth > 768;
  }
}
