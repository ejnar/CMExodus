import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPortal } from './cm-portal.model';
import { CmPortalService } from './cm-portal.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-portal',
    templateUrl: './cm-portal.component.html'
})
export class CmPortalComponent implements OnInit, OnDestroy {
cmPortals: CmPortal[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmPortalService: CmPortalService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmPortalService.query().subscribe(
            (res: HttpResponse<CmPortal[]>) => {
                this.cmPortals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmPortals();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmPortal) {
        return item.id;
    }
    registerChangeInCmPortals() {
        this.eventSubscriber = this.eventManager.subscribe('cmPortalListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
