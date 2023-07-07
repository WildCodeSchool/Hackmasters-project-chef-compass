import { Component } from '@angular/core';
import { faGear, faPeopleGroup} from "@fortawesome/free-solid-svg-icons";
import {faFacebook, faInstagram} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

    faGear = faGear;
    faPeopleGroup = faPeopleGroup;
    faFacebook = faFacebook;
    faInstagram = faInstagram;
}
