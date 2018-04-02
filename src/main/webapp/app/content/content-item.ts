import { Type } from '@angular/core';

export class ContentItem {
  constructor(public component: Type<any>, public data: any) {}
}
