import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmTopicCm } from './cm-topic-cm.model';
import { CmTopicCmService } from './cm-topic-cm.service';

@Component({
    selector: 'jhi-cm-topic-cm-detail',
    templateUrl: './cm-topic-cm-detail.component.html'
})
export class CmTopicCmDetailComponent implements OnInit, OnDestroy {

    cmTopic: CmTopicCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmTopicService: CmTopicCmService,
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
            .subscribe((cmTopicResponse: HttpResponse<CmTopicCm>) => {
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
