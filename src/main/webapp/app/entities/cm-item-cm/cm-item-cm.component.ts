import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmItemCm } from './cm-item-cm.model';
import { CmItemCmService } from './cm-item-cm.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-item-cm',
    templateUrl: './cm-item-cm.component.html'
})
export class CmItemCmComponent implements OnInit, OnDestroy {
cmItems: CmItemCm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmItemService: CmItemCmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmItemService.query().subscribe(
            (res: HttpResponse<CmItemCm[]>) => {
                this.cmItems = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmItems();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmItemCm) {
        return item.id;
    }
    registerChangeInCmItems() {
        this.eventSubscriber = this.eventManager.subscribe('cmItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
