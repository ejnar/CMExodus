import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmItemListCm } from './cm-item-list-cm.model';
import { CmItemListCmService } from './cm-item-list-cm.service';

@Component({
    selector: 'jhi-cm-item-list-cm-detail',
    templateUrl: './cm-item-list-cm-detail.component.html'
})
export class CmItemListCmDetailComponent implements OnInit, OnDestroy {

    cmItemList: CmItemListCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmItemListService: CmItemListCmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmItemLists();
    }

    load(id) {
        this.cmItemListService.find(id)
            .subscribe((cmItemListResponse: HttpResponse<CmItemListCm>) => {
                this.cmItemList = cmItemListResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmItemLists() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmItemListListModification',
            (response) => this.load(this.cmItemList.id)
        );
    }
}
