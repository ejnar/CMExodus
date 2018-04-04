import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { NGXLogger } from 'ngx-logger';

import { ContentItem } from './content-item';
import { ContentService } from './content.service';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html',
    styleUrls: [
        'content.scss'
    ]
    // providers: [NGXLogger]
})
export class ContentComponent implements OnInit {
    items: ContentItem[];
    pageId: string;

    constructor(private contentService: ContentService, private router: Router, private logger: NGXLogger) {
        router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageId = data.snapshot.queryParams.page;
            }
        } );
        this.logger.debug(' ------------------------- Your log message goes here');
    }

    ngOnInit() {
        this.items = this.contentService.getContent(this.pageId);
    }

}
