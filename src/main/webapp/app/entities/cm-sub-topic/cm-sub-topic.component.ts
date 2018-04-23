import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmSubTopic } from './cm-sub-topic.model';
import { CmSubTopicService } from './cm-sub-topic.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-sub-topic',
    templateUrl: './cm-sub-topic.component.html'
})
export class CmSubTopicComponent implements OnInit, OnDestroy {
cmSubTopics: CmSubTopic[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmSubTopicService: CmSubTopicService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmSubTopicService.query().subscribe(
            (res: HttpResponse<CmSubTopic[]>) => {
                this.cmSubTopics = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmSubTopics();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmSubTopic) {
        return item.id;
    }
    registerChangeInCmSubTopics() {
        this.eventSubscriber = this.eventManager.subscribe('cmSubTopicListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
