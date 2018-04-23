import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmTopic } from './cm-topic.model';
import { CmTopicPopupService } from './cm-topic-popup.service';
import { CmTopicService } from './cm-topic.service';

@Component({
    selector: 'jhi-cm-topic-dialog',
    templateUrl: './cm-topic-dialog.component.html'
})
export class CmTopicDialogComponent implements OnInit {

    cmTopic: CmTopic;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cmTopicService: CmTopicService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cmTopic.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmTopicService.update(this.cmTopic));
        } else {
            this.subscribeToSaveResponse(
                this.cmTopicService.create(this.cmTopic));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmTopic>>) {
        result.subscribe((res: HttpResponse<CmTopic>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmTopic) {
        this.eventManager.broadcast({ name: 'cmTopicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cm-topic-popup',
    template: ''
})
export class CmTopicPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTopicPopupService: CmTopicPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmTopicPopupService
                    .open(CmTopicDialogComponent as Component, params['id']);
            } else {
                this.cmTopicPopupService
                    .open(CmTopicDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
