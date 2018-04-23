import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmTopic } from './cm-topic.model';
import { CmTopicService } from './cm-topic.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-topic',
    templateUrl: './cm-topic.component.html'
})
export class CmTopicComponent implements OnInit, OnDestroy {
cmTopics: CmTopic[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmTopicService: CmTopicService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmTopicService.query().subscribe(
            (res: HttpResponse<CmTopic[]>) => {
                this.cmTopics = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmTopics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmTopic) {
        return item.id;
    }
    registerChangeInCmTopics() {
        this.eventSubscriber = this.eventManager.subscribe('cmTopicListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
