import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[content-directive]',
})
export class ContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
