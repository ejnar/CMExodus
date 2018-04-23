import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmSubTopic } from './cm-sub-topic.model';
import { CmSubTopicService } from './cm-sub-topic.service';

@Component({
    selector: 'jhi-cm-sub-topic-detail',
    templateUrl: './cm-sub-topic-detail.component.html'
})
export class CmSubTopicDetailComponent implements OnInit, OnDestroy {

    cmSubTopic: CmSubTopic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmSubTopicService: CmSubTopicService,
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
            .subscribe((cmSubTopicResponse: HttpResponse<CmSubTopic>) => {
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
