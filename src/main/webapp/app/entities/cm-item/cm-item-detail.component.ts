import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmItem } from './cm-item.model';
import { CmItemService } from './cm-item.service';

@Component({
    selector: 'jhi-cm-item-detail',
    templateUrl: './cm-item-detail.component.html'
})
export class CmItemDetailComponent implements OnInit, OnDestroy {

    cmItem: CmItem;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmItemService: CmItemService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmItems();
    }

    load(id) {
        this.cmItemService.find(id)
            .subscribe((cmItemResponse: HttpResponse<CmItem>) => {
                this.cmItem = cmItemResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmItems() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmItemListModification',
            (response) => this.load(this.cmItem.id)
        );
    }
}
