import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

import { CmPageCm } from '../entities/cm-page-cm/cm-page-cm.model';
import { CmPageCmService } from '../entities/cm-page-cm/cm-page-cm.service';

import { ProgramListComponent } from './modules/programList/program-list.component';

import { ContentItem } from './content-item';
import { ContentService } from './content.service';
import { ContentDirective } from './content.directive';
import { ComponentInterface } from './component-interface';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html',
    styleUrls: [
        'content.scss'
    ]
    // providers: [NGXLogger]
})
export class ContentComponent implements OnInit, OnDestroy {
    items: Promise<ContentItem[]>;
    currentAdIndex: number = -1;
    @ViewChild(ContentDirective) contentDirective: ContentDirective;
    interval: any;

    pageId: number;

    constructor(
        private contentService: ContentService,
        private cmPageService: CmPageCmService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private logger: NGXLogger) {
        this.logger.debug('ContentComponent.constructor');

        router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageId = data.snapshot.queryParams.page;
            }
        } );
    }

    ngOnInit() {
        this.logger.debug('ContentComponent.ngOnInit');
        this.items = this.contentService.getContent(this.pageId);
        this.loadComponent();
    }

    loadComponent() {
        this.items.then((items) => {
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
                const viewContainerRef = this.contentDirective.viewContainerRef;
                const componentRef = viewContainerRef.createComponent(componentFactory);
                (<ComponentInterface>componentRef.instance).data = item.data;
            }
        });
    }

    ngOnDestroy() {
        clearInterval(this.interval);
    }
}
