import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmSubTopicCm } from './cm-sub-topic-cm.model';
import { CmSubTopicCmService } from './cm-sub-topic-cm.service';

@Component({
    selector: 'jhi-cm-sub-topic-cm-detail',
    templateUrl: './cm-sub-topic-cm-detail.component.html'
})
export class CmSubTopicCmDetailComponent implements OnInit, OnDestroy {

    cmSubTopic: CmSubTopicCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmSubTopicService: CmSubTopicCmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmSubTopics();
    }

    load(id) {
        this.cmSubTopicService.find(id)
            .subscribe((cmSubTopicResponse: HttpResponse<CmSubTopicCm>) => {
                this.cmSubTopic = cmSubTopicResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmSubTopics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmSubTopicListModification',
            (response) => this.load(this.cmSubTopic.id)
        );
    }
}
