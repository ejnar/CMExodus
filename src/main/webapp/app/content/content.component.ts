import { Component, Input, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, AfterViewInit, Injector, ApplicationRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Title, Meta } from '@angular/platform-browser';

import { CmPage } from '../entities/cm-page/cm-page.model';
import { CmPageService } from '../entities/cm-page/cm-page.service';

import { ContentService } from './content.service';
import { ContentDirective } from './content.directive';
import { ComponentInterface } from './component-interface';
import { Page } from './modules/model/page.model';

import { MainComponent } from './modules/main/main.component';
import { ColumnRightComponent } from './modules/columnRight/column.component';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html',
    styleUrls: [
        'content.scss'
    ]
    // providers: [NGXLogger]
})
export class ContentComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(ContentDirective) contentDirective: ContentDirective;
    currentAdIndex: number = -1;
    routerEventSubscribe: any;
    translateServiceSubscribe: any;
    promise: Promise<Page>;
    pageId: number;
    pageLayout: string;
    page: Page;

    constructor(
        private contentService: ContentService,
        private cmPageService: CmPageService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
        private translateService: TranslateService,
        private injector: Injector,
        private appRef: ApplicationRef,
        private logger: NGXLogger) {

        this.routerEventSubscribe = this.router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageId = data.snapshot.queryParams.page;
            }else if (data instanceof NavigationEnd) {
                if ( (!this.pageId || this.pageId > 0)) {
                    this.promise = this.contentService.getContent(this.pageId);
                    this.loadComponent();
                }
            }
        } );
        this.translateServiceSubscribe = this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
           if (this.page) {
                this.titleService.setTitle(this.page[this.titleName(this.translateService.currentLang)]);
           }
        });
    }

    private titleName(token) {
        return 'title' + token.charAt(0).toUpperCase() + token.slice(1);
    }

    ngOnInit() {
        this.logger.debug('ContentComponent.ngOnInit');
    }
    ngAfterViewInit() {
        this.logger.debug('ContentComponent.ngAfterViewInit');
    }

    loadComponent() {
        this.logger.debug('ContentComponent.loadComponent');
        this.contentDirective.viewContainerRef.clear();

        const viewContainerRef = this.contentDirective.viewContainerRef;
        const mainFactory = this.componentFactoryResolver.resolveComponentFactory(MainComponent);
        const columnRightFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnRightComponent);

        let structureComponent;
        this.promise.then((page) => {
            this.page = page;
            this.titleService.setTitle(page.titleSv);
            // this.metaService.addTag({ name: page.metaTitle, content: page.metaDescription });
            if (page.pageLayout === 'COLUMN_RIGHT') {
                structureComponent = viewContainerRef.createComponent(columnRightFactory);
            } else {
                structureComponent = viewContainerRef.createComponent(mainFactory);
            }
            for (let i = 0; i < page.items.length; i++) {
                const item = page.items[i];
                const itemFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
                const itemRef = structureComponent.instance.mainContainerRef.createComponent(itemFactory);
                (<ComponentInterface>itemRef.instance).data = item.data;
            }
        });
    }
    ngOnDestroy() {
        this.routerEventSubscribe.unsubscribe();
        this.contentDirective.viewContainerRef.clear();
    }
}
