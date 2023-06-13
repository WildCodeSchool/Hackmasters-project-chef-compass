import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-demo-component',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
})
export class DemoComponent {
  @Input()
  title = '';
}
