import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmPage } from './cm-page.model';
import { CmPageService } from './cm-page.service';

@Component({
    selector: 'jhi-cm-page-detail',
    templateUrl: './cm-page-detail.component.html'
})
export class CmPageDetailComponent implements OnInit, OnDestroy {

    cmPage: CmPage;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmPageService: CmPageService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmPages();
    }

    load(id) {
        this.cmPageService.find(id)
            .subscribe((cmPageResponse: HttpResponse<CmPage>) => {
                this.cmPage = cmPageResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmPages() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmPageListModification',
            (response) => this.load(this.cmPage.id)
        );
    }
}
