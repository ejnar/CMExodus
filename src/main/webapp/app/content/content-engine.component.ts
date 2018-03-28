import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { ContentDirective } from './content.directive';
import { ContentItem }      from './content-item';
import { ContentComponent } from './content.component';

@Component({
  selector: 'app-ad-banner',
  template: `
              <div class="ad-banner">
                <h3>Advertisements</h3>
                <ng-template content-directive></ng-template>
              </div>
            `
})
export class ContentEngineComponent implements OnInit, OnDestroy {
  @Input() items: ContentItem[];
  currentAdIndex: number = -1;
  @ViewChild(ContentDirective) contentDirective: ContentDirective;
  interval: any;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
    this.getContentes();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  loadComponent() {
    this.currentAdIndex = (this.currentAdIndex + 1) % this.items.length;
    let item = this.items[this.currentAdIndex];

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);

    let viewContainerRef = this.contentDirective.viewContainerRef;
    // viewContainerRef.clear();

    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<ContentComponent>componentRef.instance).data = item.data;
  }

  getContentes() {
    this.interval = setInterval(() => {
      this.loadComponent();
    }, 3000);
  }
}
