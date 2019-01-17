import { OnInit, OnDestroy, Component, Input, ViewChild, AfterViewInit } from '@angular/core';
import { ComponentFactory, ComponentFactoryResolver, Injector, ApplicationRef, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, ActivationEnd, NavigationEnd } from '@angular/router';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { Subscription } from 'rxjs/Subscription';
import { Title, Meta } from '@angular/platform-browser';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPage } from '../entities/cm-page/cm-page.model';
import { CmPageService } from '../entities/cm-page/cm-page.service';

import { ComponentInterface } from '../content/component-interface';

import { DataService } from './data.service';
import { DataDirective } from './data.directive';
import { CmModule, CmModuleService, ModuleType } from '../entities/cm-module';

import { Page } from './modules/model/page.model';
import { MainComponent } from './modules/main/main.component';
import { ColumnRightComponent } from './modules/columnRight/column.component';

@Component({
    selector: 'jhi-data',
    templateUrl: './data.component.html',
    styleUrls: [
        'data.scss'
    ]
    // providers: [NGXLogger]
})
export class DataComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild(DataDirective) contentDirective: DataDirective;
    currentAdIndex: number = -1;
    routerEventSubscribe: any;
    translateServiceSubscribe: any;
    promise: Promise<Page>;
    pageId: number;
    pageLayout: string;
    page: Page;
    oneModule = false;
    private mainFactory: ComponentFactory<MainComponent>;
    private subscription: Subscription;

    itemList: any = [];

    constructor(
        private contentService: DataService,
        private cmPageService: CmPageService,
        private cmModuleService: CmModuleService,
        private eventManager: JhiEventManager,
        private componentFactoryResolver: ComponentFactoryResolver,
        private router: Router,
        private titleService: Title,
        private metaService: Meta,
        private translateService: TranslateService,
        private injector: Injector,
        private appRef: ApplicationRef,
        private route: ActivatedRoute,
        // private dateUtils: JhiDateUtils,
        private logger: NGXLogger) {

        this.subscription = this.route.params.subscribe((params) => {
            // this.registerChangeInCmPages(params['id']);
            // this.logger.debug(params);
            // this.pageId = params['id'];
            // this.promise = this.contentService.getContent(params['id']);
            // this.loadComponent();
        });

        this.routerEventSubscribe = this.router.events.subscribe((data) => {
            if (data instanceof ActivationEnd) {
                this.pageId = data.snapshot.queryParams.page;
            }else if (data instanceof NavigationEnd) {
                if (this.pageId !== undefined) {
                    if ( (!this.pageId || this.pageId > 0)) {
                        this.promise = this.contentService.getContent(this.pageId);
                        this.loadComponent();
                    }
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

    save() {
        this.logger.debug('save');
        this.logger.debug(this.page);

        if (this.page.id !== undefined) {
            const cmModules: Observable<HttpResponse<CmModule>>[] = [];
            this.page.items.forEach((item) => {
                cmModules.push(this.cmModuleService.update(item.data.module));
            });
            this.forkJoinToSaveModuleResponse(cmModules);
        } else {
            // this.subscribeToSaveModuleResponse(this.cmModuleService.create(this.cmPage));
        }

    }

    private forkJoinToSaveModuleResponse(observables: Observable<HttpResponse<CmModule>>[]) {

        forkJoin(observables).subscribe((results) => {
            this.onSaveModuleSuccess(results);
            // this.loadedCharacter = results[0];
        });
    }

    private onSaveModuleSuccess(modules: HttpResponse<CmModule>[]) {
        this.logger.debug(modules);
        this.eventManager.broadcast({ name: 'cmPageListModification', content: 'OK'});
        // this.clear();
    }

    clear() {
        this.logger.debug('clear');
        window.history.back();
        // this.router.navigate(['/admin/page', {}]);
    }

    loadComponent() {
        this.logger.debug('ContentComponent.loadComponent');

        this.contentDirective.viewContainerRef.clear();
        const viewContainerRef = this.contentDirective.viewContainerRef;
        this.mainFactory = this.componentFactoryResolver.resolveComponentFactory(MainComponent);
        const columnRightFactory = this.componentFactoryResolver.resolveComponentFactory(ColumnRightComponent);

        let structureComponent;
        this.promise.then((page) => {
            this.logger.debug(page);
            this.page = page;
            this.titleService.setTitle(page.titleSv);
            // this.metaService.addTag({ name: page.metaTitle, content: page.metaDescription });
            if (page.pageLayout === 'COLUMN_RIGHT') {
                structureComponent = viewContainerRef.createComponent(columnRightFactory);
            } else {
                structureComponent = viewContainerRef.createComponent(this.mainFactory);
            }
            this.logger.debug('------------------------');
            for (let i = 0; i < page.items.length; i++) {
                const item = page.items[i];
                // console.info(item);
                if (item.data.type === 'PROGRAM_LIST') {
                    this.oneModule = true;
                }
                const itemFactory = this.componentFactoryResolver.resolveComponentFactory(item.component);
                const itemRef = structureComponent.instance.mainContainerRef.createComponent(itemFactory);
                (<ComponentInterface>itemRef.instance).data = item.data;
            }
            this.logger.debug('------------------------');
        });
    }
    ngOnDestroy() {
        this.routerEventSubscribe.unsubscribe();
        this.contentDirective.viewContainerRef.clear();
    }

    private onSaveError() {
    }
}
