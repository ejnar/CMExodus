import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';

import { ContentItem } from './content-item';
import { ContentService } from './content.service';

@Component({
    selector: 'jhi-content',
    template: `
        <div>
            <jhi-content-engine [items]="items"></jhi-content-engine>
        </div>
    `,
    styleUrls: [
        'content.scss'
    ]
})
export class ContentComponent implements OnInit {
  items: ContentItem[];

  constructor(private contentService: ContentService) { }

  ngOnInit() {
    this.items = this.contentService.getContent();
  }

}
