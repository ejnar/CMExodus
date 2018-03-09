import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmItemCm } from './cm-item-cm.model';
import { CmItemCmService } from './cm-item-cm.service';

@Component({
    selector: 'jhi-cm-item-cm-detail',
    templateUrl: './cm-item-cm-detail.component.html'
})
export class CmItemCmDetailComponent implements OnInit, OnDestroy {

    cmItem: CmItemCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmItemService: CmItemCmService,
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
            .subscribe((cmItemResponse: HttpResponse<CmItemCm>) => {
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
