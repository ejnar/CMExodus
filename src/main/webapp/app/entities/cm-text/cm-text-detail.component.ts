import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmText } from './cm-text.model';
import { CmTextService } from './cm-text.service';

@Component({
    selector: 'jhi-cm-text-detail',
    templateUrl: './cm-text-detail.component.html'
})
export class CmTextDetailComponent implements OnInit, OnDestroy {

    cmText: CmText;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmTextService: CmTextService,
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
            .subscribe((cmTextResponse: HttpResponse<CmText>) => {
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
