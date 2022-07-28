import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appPopup]',
  exportAs: 'appPopup'
})
export class PopupDirective {

  constructor(public element: ElementRef) { }

}
