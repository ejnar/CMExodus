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
  items: ContentItem[];
  currentAdIndex: number = -1;
  @ViewChild(ContentDirective) contentDirective: ContentDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private contentService: ContentService) { }

  ngOnInit() {
    this.items = this.contentService.getContent();
    this.loadComponent();
    this.getContentes();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.items.length;
    const item = this.items[this.currentAdIndex];

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);

    const viewContainerRef = this.contentDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<ComponentInterface>componentRef.instance).data = item.data;
  }

  getContentes() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
