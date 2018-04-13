import { Component, Input, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Title, Meta } from '@angular/platform-browser';

import { CmPageCm } from '../entities/cm-page-cm/cm-page-cm.model';
import { CmPageCmService } from '../entities/cm-page-cm/cm-page-cm.service';

import { ContentService } from './content.service';
import { ContentDirective } from './content.directive';
import { ComponentInterface } from './component-interface';
import { Page } from './modules/model/page.model';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html',
    styleUrls: [
        'content.scss'
    ]
    // providers: [NGXLogger]
})
export class ContentComponent implements OnInit, OnDestroy {
    @ViewChild(ContentDirective) contentDirective: ContentDirective;
    currentAdIndex: number = -1;
    routerEventSubscribe: any;
    page: Promise<Page>;
    // interval: any;
    pageId: number;
    pageLayout: string;

    constructor(
        private contentService: ContentService,
        private cmPageService: CmPageCmService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
        private logger: NGXLogger) {

        this.routerEventSubscribe = this.router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageId = data.snapshot.queryParams.page;
            }else if (data instanceof NavigationEnd) {
                if ( (!this.pageId || this.pageId > 0)) {
                    this.page = this.contentService.getContent(this.pageId);
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
        this.page.then((page) => {
            this.pageLayout = page.pageLayout;
            this.titleService.setTitle(page.title);
            // this.metaService.addTag({ name: page.metaTitle, content: page.metaDescription });
            for (let i = 0; i < page.items.length; i++) {
                const item = page.items[i];
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
                const viewContainerRef = this.contentDirective.viewContainerRef;
                const componentRef = viewContainerRef.createComponent(componentFactory);
                (<ComponentInterface>componentRef.instance).data = item.data;
            }
        });
    }

    ngOnDestroy() {
        // clearInterval(this.interval);
        this.contentDirective.viewContainerRef.clear();
        this.routerEventSubscribe.unsubscribe();
    }
}
