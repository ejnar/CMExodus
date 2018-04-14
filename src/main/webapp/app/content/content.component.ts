import { Component, Input, ViewChild, ComponentFactoryResolver, OnInit, OnDestroy, AfterViewInit, Injector, ApplicationRef, ViewContainerRef } from '@angular/core';
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
import { MainComponent } from './main.component';

@Component({
    selector: 'jhi-content',
    templateUrl: './content.component.html',
    styleUrls: [
        'content.scss'
    ]
    // providers: [NGXLogger]
})
export class ContentComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('parent', {read: ViewContainerRef}) parent: ViewContainerRef;
    // @ViewChild(ContentDirective) contentDirective: ContentDirective;
    currentAdIndex: number = -1;
    routerEventSubscribe: any;
    page: Promise<Page>;
    // interval: any;
    pageId: number;
    pageLayout: string;
    // mainComponent: MainComponent;

    constructor(
        private contentService: ContentService,
        private cmPageService: CmPageCmService,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
        private injector: Injector,
        private appRef: ApplicationRef,
        private logger: NGXLogger) {

        // const mainComponent = this.componentFactoryResolver.resolveComponentFactory(MainComponent);
        // this.parent.createComponent(mainComponent);
        // const mainComponentRef = this.parent.createComponent(mainComponent).instance.create(this.injector, null, '#parent');
        // var mainComponentRef = mainComponent.create(this.injector, null, '#parent');
        // (this.appRef)._loadComponent(mainComponentRef);

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

    ngAfterViewInit() {
        const factory = this.componentFactoryResolver.resolveComponentFactory(MainComponent);
        const componentRef = this.parent.createComponent(factory);
        console.log(componentRef);
    }

    ngOnInit() {
        this.logger.debug('ContentComponent.ngOnInit');
    }

    loadComponent() {
        this.logger.debug('ContentComponent.loadComponent');
        // this.contentDirective.viewContainerRef.clear();
        this.parent.clear();

        // const mainFactory = this.componentFactoryResolver.resolveComponentFactory(MainComponent);
        // const mainComponentRef = this.parent.createComponent(mainFactory);

        this.page.then((page) => {
            this.pageLayout = page.pageLayout;
            this.titleService.setTitle(page.title);
            // this.metaService.addTag({ name: page.metaTitle, content: page.metaDescription });
            for (let i = 0; i < page.items.length; i++) {
                const item = page.items[i];
                const componentFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);

                // const viewContainerRef = this.contentDirective.viewContainerRef;
                // const componentRef = viewContainerRef.createComponent(componentFactory);

                const mainComponentRef = this.parent.createComponent(componentFactory);

                (<ComponentInterface>mainComponentRef.instance).data = item.data;
            }
        });
    }
    ngOnDestroy() {
        // clearInterval(this.interval);
         this.parent.clear();
        // this.contentDirective.viewContainerRef.clear();
        this.routerEventSubscribe.unsubscribe();
    }
}
