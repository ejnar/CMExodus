import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmPortalCm } from './cm-portal-cm.model';
import { CmPortalCmService } from './cm-portal-cm.service';

@Component({
    selector: 'jhi-cm-portal-cm-detail',
    templateUrl: './cm-portal-cm-detail.component.html'
})
export class CmPortalCmDetailComponent implements OnInit, OnDestroy {

    cmPortal: CmPortalCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmPortalService: CmPortalCmService,
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
            .subscribe((cmPortalResponse: HttpResponse<CmPortalCm>) => {
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
