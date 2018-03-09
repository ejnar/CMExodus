import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmSubTopicCm } from './cm-sub-topic-cm.model';
import { CmSubTopicCmService } from './cm-sub-topic-cm.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-sub-topic-cm',
    templateUrl: './cm-sub-topic-cm.component.html'
})
export class CmSubTopicCmComponent implements OnInit, OnDestroy {
cmSubTopics: CmSubTopicCm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmSubTopicService: CmSubTopicCmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmSubTopicService.query().subscribe(
            (res: HttpResponse<CmSubTopicCm[]>) => {
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

    trackId(index: number, item: CmSubTopicCm) {
        return item.id;
    }
    registerChangeInCmSubTopics() {
        this.eventSubscriber = this.eventManager.subscribe('cmSubTopicListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
