import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDemo]',
})
export class DemoDirective {
  constructor(private element: ElementRef) {
    this.element.nativeElement.style.textDecoration = 'underline';
  }
}
