import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmItemList } from './cm-item-list.model';
import { CmItemListService } from './cm-item-list.service';

@Component({
    selector: 'jhi-cm-item-list-detail',
    templateUrl: './cm-item-list-detail.component.html'
})
export class CmItemListDetailComponent implements OnInit, OnDestroy {

    cmItemList: CmItemList;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmItemListService: CmItemListService,
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
            .subscribe((cmItemListResponse: HttpResponse<CmItemList>) => {
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
