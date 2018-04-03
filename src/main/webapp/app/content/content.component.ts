import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';

import { ContentItem } from './content-item';
import { ContentService } from './content.service';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html',
    styleUrls: [
        'content.scss'
    ]
})
export class ContentComponent implements OnInit {
    items: ContentItem[];
    pageParam: String;

    constructor(private contentService: ContentService, private router: Router) {
        router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageParam = data.snapshot.queryParams.page;
            }
        } );
    }

    ngOnInit() {
        this.items = this.contentService.getContent();
    }

}
