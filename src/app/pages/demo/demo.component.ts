import { Component } from '@angular/core';
import { DemoService } from 'src/app/services/demo.service';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoPageComponent {
  linterList: string[] = [];

  constructor(demoService: DemoService) {
    this.linterList = demoService.findAllLinter();
  }
}
