import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmTopic } from '../../entities/cm-topic/cm-topic.model';
import { CmSubTopic } from '../../entities/cm-sub-topic/cm-sub-topic.model';
import { CmSubTopicService } from '../../entities/cm-sub-topic/cm-sub-topic.service';
import { CmTopicService } from '../../entities/cm-topic/cm-topic.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-sub-menu-user',
    templateUrl: './sub-menu.component.html'
})
export class SubMenuComponent implements OnInit, OnDestroy {

    cmSubTopics: CmSubTopic[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private subscription: Subscription;

    constructor(
        private cmTopicService: CmTopicService,
        private cmSubTopicService: CmSubTopicService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal,
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
        this.cmTopicService.find(id)
            .subscribe((cmTopicResponse: HttpResponse<CmTopic>) => {
                this.cmSubTopics = cmTopicResponse.body.subTopics;
            });
    }

    loadAll() {
        this.cmSubTopicService.query().subscribe(
            (res: HttpResponse<CmSubTopic[]>) => {
                this.cmSubTopics = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    previousState() {
        window.history.back();
    }
}
