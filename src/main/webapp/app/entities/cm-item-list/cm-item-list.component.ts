import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmItemList } from './cm-item-list.model';
import { CmItemListService } from './cm-item-list.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-item-list',
    templateUrl: './cm-item-list.component.html'
})
export class CmItemListComponent implements OnInit, OnDestroy {
cmItemLists: CmItemList[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmItemListService: CmItemListService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmItemListService.query().subscribe(
            (res: HttpResponse<CmItemList[]>) => {
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

    trackId(index: number, item: CmItemList) {
        return item.id;
    }
    registerChangeInCmItemLists() {
        this.eventSubscriber = this.eventManager.subscribe('cmItemListListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
