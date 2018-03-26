import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmSubTopicCm } from './cm-sub-topic-cm.model';
import { CmSubTopicCmPopupService } from './cm-sub-topic-cm-popup.service';
import { CmSubTopicCmService } from './cm-sub-topic-cm.service';
import { CmTopicCm, CmTopicCmService } from '../cm-topic-cm';
import { CmPageCm, CmPageCmService } from '../cm-page-cm';

@Component({
    selector: 'jhi-cm-sub-topic-cm-dialog',
    templateUrl: './cm-sub-topic-cm-dialog.component.html'
})
export class CmSubTopicCmDialogComponent implements OnInit {

    cmSubTopic: CmSubTopicCm;
    isSaving: boolean;

    cmtopics: CmTopicCm[];

    pages: CmPageCm[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmSubTopicService: CmSubTopicCmService,
        private cmTopicService: CmTopicCmService,
        private cmPageService: CmPageCmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmTopicService.query()
            .subscribe((res: HttpResponse<CmTopicCm[]>) => { this.cmtopics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmPageService
            .query({filter: 'cmsubtopic-is-null'})
            .subscribe((res: HttpResponse<CmPageCm[]>) => {
                if (!this.cmSubTopic.pageId) {
                    this.pages = res.body;
                } else {
                    this.cmPageService
                        .find(this.cmSubTopic.pageId)
                        .subscribe((subRes: HttpResponse<CmPageCm>) => {
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmSubTopicCm>>) {
        result.subscribe((res: HttpResponse<CmSubTopicCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmSubTopicCm) {
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

    trackCmTopicById(index: number, item: CmTopicCm) {
        return item.id;
    }

    trackCmPageById(index: number, item: CmPageCm) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-sub-topic-cm-popup',
    template: ''
})
export class CmSubTopicCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmSubTopicPopupService: CmSubTopicCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmSubTopicPopupService
                    .open(CmSubTopicCmDialogComponent as Component, params['id']);
            } else {
                this.cmSubTopicPopupService
                    .open(CmSubTopicCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
