import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmItem } from './cm-item.model';
import { CmItemService } from './cm-item.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-item',
    templateUrl: './cm-item.component.html'
})
export class CmItemComponent implements OnInit, OnDestroy {
cmItems: CmItem[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmItemService: CmItemService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmItemService.query().subscribe(
            (res: HttpResponse<CmItem[]>) => {
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

    trackId(index: number, item: CmItem) {
        return item.id;
    }
    registerChangeInCmItems() {
        this.eventSubscriber = this.eventManager.subscribe('cmItemListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
