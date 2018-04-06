import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmItemListCm } from './cm-item-list-cm.model';
import { CmItemListCmService } from './cm-item-list-cm.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-item-list-cm',
    templateUrl: './cm-item-list-cm.component.html'
})
export class CmItemListCmComponent implements OnInit, OnDestroy {
cmItemLists: CmItemListCm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmItemListService: CmItemListCmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmItemListService.query().subscribe(
            (res: HttpResponse<CmItemListCm[]>) => {
                this.cmItemLists = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmItemLists();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmItemListCm) {
        return item.id;
    }
    registerChangeInCmItemLists() {
        this.eventSubscriber = this.eventManager.subscribe('cmItemListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
