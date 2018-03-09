import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPageAuthorityCm } from './cm-page-authority-cm.model';
import { CmPageAuthorityCmService } from './cm-page-authority-cm.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-page-authority-cm',
    templateUrl: './cm-page-authority-cm.component.html'
})
export class CmPageAuthorityCmComponent implements OnInit, OnDestroy {
cmPageAuthorities: CmPageAuthorityCm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmPageAuthorityService: CmPageAuthorityCmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmPageAuthorityService.query().subscribe(
            (res: HttpResponse<CmPageAuthorityCm[]>) => {
                this.cmPageAuthorities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmPageAuthorities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmPageAuthorityCm) {
        return item.id;
    }
    registerChangeInCmPageAuthorities() {
        this.eventSubscriber = this.eventManager.subscribe('cmPageAuthorityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
