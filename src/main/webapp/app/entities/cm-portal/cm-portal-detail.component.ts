import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmPortal } from './cm-portal.model';
import { CmPortalService } from './cm-portal.service';

@Component({
    selector: 'jhi-cm-portal-detail',
    templateUrl: './cm-portal-detail.component.html'
})
export class CmPortalDetailComponent implements OnInit, OnDestroy {

    cmPortal: CmPortal;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmPortalService: CmPortalService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmPortals();
    }

    load(id) {
        this.cmPortalService.find(id)
            .subscribe((cmPortalResponse: HttpResponse<CmPortal>) => {
                this.cmPortal = cmPortalResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmPortals() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmPortalListModification',
            (response) => this.load(this.cmPortal.id)
        );
    }
}
