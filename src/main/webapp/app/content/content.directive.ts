import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[jhiContentDirective]'
})
export class ContentDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
