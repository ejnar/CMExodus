import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiParseLinks, JhiAlertService } from 'ng-jhipster';

import { CmPage } from '../../entities/cm-page/cm-page.model';
import { CmPageService } from '../../entities/cm-page/cm-page.service';

import { ITEMS_PER_PAGE, Principal } from '../../shared';

@Component({
    selector: 'jhi-page-user',
    templateUrl: './page-module.component.html'
})
export class PageDataComponent implements OnInit, OnDestroy {

currentAccount: any;
    cmPages: CmPage[];
    error: any;
    success: any;
    eventSubscriber: Subscription;
    routeData: any;
    links: any;
    totalItems: any;
    queryCount: any;
    itemsPerPage: any;
    page: any;
    predicate: any;
    previousPage: any;
    reverse: any;

    constructor(
        private cmPageService: CmPageService,
        private parseLinks: JhiParseLinks,
        private jhiAlertService: JhiAlertService,
        private principal: Principal,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private eventManager: JhiEventManager
    ) {

    }

    loadAll() {
        this.cmPageService.findByUser().subscribe(
                (res: HttpResponse<CmPage[]>) => this.onSuccess(res.body, res.headers),
                (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        // this.registerChangeInCmPages();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onSuccess(data, headers) {
        console.log(data);
        // this.links = this.parseLinks.parse(headers.get('link'));
        // this.totalItems = headers.get('X-Total-Count');
        // this.queryCount = this.totalItems;
        // this.page = pagingParams.page;
        this.cmPages = data;
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

}
