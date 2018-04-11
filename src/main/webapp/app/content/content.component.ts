import { Component, Input, OnInit, ViewChild, ComponentFactoryResolver, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd, NavigationEnd } from '@angular/router';
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

    routerEventSubscribe: any;
    interval: any;
    pageId: number;

    constructor(
        private contentService: ContentService,
        private cmPageService: CmPageCmService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private logger: NGXLogger) {
        this.logger.debug('ContentComponent.constructor');

        this.routerEventSubscribe = this.router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageId = data.snapshot.queryParams.page;
            }else if (data instanceof NavigationEnd) {
                if ( (!this.pageId || this.pageId > 0)) {
                    this.items = this.contentService.getContent(this.pageId);
                    this.loadComponent();
                }
            }
        } );
    }

    ngOnInit() {
        this.logger.debug('ContentComponent.ngOnInit');
    }

    loadComponent() {
        this.logger.debug('ContentComponent.loadComponent');
        this.contentDirective.viewContainerRef.clear();
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
        this.contentDirective.viewContainerRef.clear();
        this.routerEventSubscribe.unsubscribe();
    }
}
