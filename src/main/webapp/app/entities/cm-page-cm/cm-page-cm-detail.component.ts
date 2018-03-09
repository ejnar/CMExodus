import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmPageCm } from './cm-page-cm.model';
import { CmPageCmService } from './cm-page-cm.service';

@Component({
    selector: 'jhi-cm-page-cm-detail',
    templateUrl: './cm-page-cm-detail.component.html'
})
export class CmPageCmDetailComponent implements OnInit, OnDestroy {

    cmPage: CmPageCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmPageService: CmPageCmService,
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
            .subscribe((cmPageResponse: HttpResponse<CmPageCm>) => {
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
