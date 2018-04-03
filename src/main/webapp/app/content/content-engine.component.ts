import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { ContentItem } from './content-item';
import { ContentService } from './content.service';
import { ContentDirective } from './content.directive';
import { ComponentInterface } from './component-interface';

@Component({
    selector: 'jhi-content-engine',
    template: `
              <div class="ad-banner">
                <ng-template jhiContentDirective></ng-template>
              </div>
            `,
    styleUrls: [
        'content.scss'
    ]
})
export class ContentEngineComponent implements OnInit, OnDestroy {
  @Input() items: ContentItem[];
  currentAdIndex: number = -1;
  @ViewChild(ContentDirective) contentDirective: ContentDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private contentService: ContentService) { }

  ngOnInit() {
    // this.items = this.contentService.getContent();
    this.loadComponent();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    for (let i = 0; i < this.items.length; i++) {
        const item = this.items[i];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
        const viewContainerRef = this.contentDirective.viewContainerRef;
        const componentRef = viewContainerRef.createComponent(componentFactory);
        (<ComponentInterface>componentRef.instance).data = item.data;
    }

  }
}
