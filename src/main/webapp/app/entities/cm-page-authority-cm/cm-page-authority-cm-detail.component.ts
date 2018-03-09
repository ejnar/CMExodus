import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmPageAuthorityCm } from './cm-page-authority-cm.model';
import { CmPageAuthorityCmService } from './cm-page-authority-cm.service';

@Component({
    selector: 'jhi-cm-page-authority-cm-detail',
    templateUrl: './cm-page-authority-cm-detail.component.html'
})
export class CmPageAuthorityCmDetailComponent implements OnInit, OnDestroy {

    cmPageAuthority: CmPageAuthorityCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmPageAuthorityService: CmPageAuthorityCmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmPageAuthorities();
    }

    load(id) {
        this.cmPageAuthorityService.find(id)
            .subscribe((cmPageAuthorityResponse: HttpResponse<CmPageAuthorityCm>) => {
                this.cmPageAuthority = cmPageAuthorityResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmPageAuthorities() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmPageAuthorityListModification',
            (response) => this.load(this.cmPageAuthority.id)
        );
    }
}
