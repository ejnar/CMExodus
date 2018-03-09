import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmTopicCm } from './cm-topic-cm.model';
import { CmTopicCmService } from './cm-topic-cm.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-topic-cm',
    templateUrl: './cm-topic-cm.component.html'
})
export class CmTopicCmComponent implements OnInit, OnDestroy {
cmTopics: CmTopicCm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmTopicService: CmTopicCmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmTopicService.query().subscribe(
            (res: HttpResponse<CmTopicCm[]>) => {
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

    trackId(index: number, item: CmTopicCm) {
        return item.id;
    }
    registerChangeInCmTopics() {
        this.eventSubscriber = this.eventManager.subscribe('cmTopicListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
