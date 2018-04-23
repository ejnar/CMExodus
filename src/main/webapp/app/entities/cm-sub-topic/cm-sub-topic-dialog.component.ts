import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmSubTopic } from './cm-sub-topic.model';
import { CmSubTopicPopupService } from './cm-sub-topic-popup.service';
import { CmSubTopicService } from './cm-sub-topic.service';
import { CmTopic, CmTopicService } from '../cm-topic';
import { CmPage, CmPageService } from '../cm-page';

@Component({
    selector: 'jhi-cm-sub-topic-dialog',
    templateUrl: './cm-sub-topic-dialog.component.html'
})
export class CmSubTopicDialogComponent implements OnInit {

    cmSubTopic: CmSubTopic;
    isSaving: boolean;

    cmtopics: CmTopic[];

    pages: CmPage[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmSubTopicService: CmSubTopicService,
        private cmTopicService: CmTopicService,
        private cmPageService: CmPageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmTopicService.query()
            .subscribe((res: HttpResponse<CmTopic[]>) => { this.cmtopics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmPageService
            .query({filter: 'cmsubtopic-is-null'})
            .subscribe((res: HttpResponse<CmPage[]>) => {
                if (!this.cmSubTopic.pageId) {
                    this.pages = res.body;
                } else {
                    this.cmPageService
                        .find(this.cmSubTopic.pageId)
                        .subscribe((subRes: HttpResponse<CmPage>) => {
                            this.pages = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cmSubTopic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmSubTopicService.update(this.cmSubTopic));
        } else {
            this.subscribeToSaveResponse(
                this.cmSubTopicService.create(this.cmSubTopic));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmSubTopic>>) {
        result.subscribe((res: HttpResponse<CmSubTopic>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmSubTopic) {
        this.eventManager.broadcast({ name: 'cmSubTopicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCmTopicById(index: number, item: CmTopic) {
        return item.id;
    }

    trackCmPageById(index: number, item: CmPage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-sub-topic-popup',
    template: ''
})
export class CmSubTopicPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmSubTopicPopupService: CmSubTopicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmSubTopicPopupService
                    .open(CmSubTopicDialogComponent as Component, params['id']);
            } else {
                this.cmSubTopicPopupService
                    .open(CmSubTopicDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
