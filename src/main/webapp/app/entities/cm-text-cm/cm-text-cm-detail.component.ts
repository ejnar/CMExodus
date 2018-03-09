import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmTextCm } from './cm-text-cm.model';
import { CmTextCmService } from './cm-text-cm.service';

@Component({
    selector: 'jhi-cm-text-cm-detail',
    templateUrl: './cm-text-cm-detail.component.html'
})
export class CmTextCmDetailComponent implements OnInit, OnDestroy {

    cmText: CmTextCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmTextService: CmTextCmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmTexts();
    }

    load(id) {
        this.cmTextService.find(id)
            .subscribe((cmTextResponse: HttpResponse<CmTextCm>) => {
                this.cmText = cmTextResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmTexts() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmTextListModification',
            (response) => this.load(this.cmText.id)
        );
    }
}
