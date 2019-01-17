import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[jhiDataDirective]'
})
export class DataDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}
