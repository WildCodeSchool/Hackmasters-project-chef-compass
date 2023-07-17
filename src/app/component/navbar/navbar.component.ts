import { Component } from '@angular/core';
import { faMagnifyingGlass, faBars } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
faMagnifyingGlass = faMagnifyingGlass;
faBars = faBars;

}
