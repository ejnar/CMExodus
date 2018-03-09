import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPortalCm } from './cm-portal-cm.model';
import { CmPortalCmService } from './cm-portal-cm.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-portal-cm',
    templateUrl: './cm-portal-cm.component.html'
})
export class CmPortalCmComponent implements OnInit, OnDestroy {
cmPortals: CmPortalCm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmPortalService: CmPortalCmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmPortalService.query().subscribe(
            (res: HttpResponse<CmPortalCm[]>) => {
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

    trackId(index: number, item: CmPortalCm) {
        return item.id;
    }
    registerChangeInCmPortals() {
        this.eventSubscriber = this.eventManager.subscribe('cmPortalListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
