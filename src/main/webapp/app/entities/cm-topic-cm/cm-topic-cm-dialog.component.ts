import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmTopicCm } from './cm-topic-cm.model';
import { CmTopicCmPopupService } from './cm-topic-cm-popup.service';
import { CmTopicCmService } from './cm-topic-cm.service';

@Component({
    selector: 'jhi-cm-topic-cm-dialog',
    templateUrl: './cm-topic-cm-dialog.component.html'
})
export class CmTopicCmDialogComponent implements OnInit {

    cmTopic: CmTopicCm;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cmTopicService: CmTopicCmService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmTopicCm>>) {
        result.subscribe((res: HttpResponse<CmTopicCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmTopicCm) {
        this.eventManager.broadcast({ name: 'cmTopicListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cm-topic-cm-popup',
    template: ''
})
export class CmTopicCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTopicPopupService: CmTopicCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmTopicPopupService
                    .open(CmTopicCmDialogComponent as Component, params['id']);
            } else {
                this.cmTopicPopupService
                    .open(CmTopicCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
