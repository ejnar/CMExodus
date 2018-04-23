import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmTopic } from './cm-topic.model';
import { CmTopicService } from './cm-topic.service';

@Component({
    selector: 'jhi-cm-topic-detail',
    templateUrl: './cm-topic-detail.component.html'
})
export class CmTopicDetailComponent implements OnInit, OnDestroy {

    cmTopic: CmTopic;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmTopicService: CmTopicService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmTopics();
    }

    load(id) {
        this.cmTopicService.find(id)
            .subscribe((cmTopicResponse: HttpResponse<CmTopic>) => {
                this.cmTopic = cmTopicResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmTopics() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmTopicListModification',
            (response) => this.load(this.cmTopic.id)
        );
    }
}
