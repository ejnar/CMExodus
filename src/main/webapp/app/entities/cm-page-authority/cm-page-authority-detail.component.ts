import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmPageAuthority } from './cm-page-authority.model';
import { CmPageAuthorityService } from './cm-page-authority.service';

@Component({
    selector: 'jhi-cm-page-authority-detail',
    templateUrl: './cm-page-authority-detail.component.html'
})
export class CmPageAuthorityDetailComponent implements OnInit, OnDestroy {

    cmPageAuthority: CmPageAuthority;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmPageAuthorityService: CmPageAuthorityService,
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
            .subscribe((cmPageAuthorityResponse: HttpResponse<CmPageAuthority>) => {
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
