import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPageCm } from './cm-page-cm.model';
import { CmPageCmPopupService } from './cm-page-cm-popup.service';
import { CmPageCmService } from './cm-page-cm.service';
import { CmSubTopicCm, CmSubTopicCmService } from '../cm-sub-topic-cm';
import { CmModuleCm, CmModuleCmService } from '../cm-module-cm';

@Component({
    selector: 'jhi-cm-page-cm-dialog',
    templateUrl: './cm-page-cm-dialog.component.html'
})
export class CmPageCmDialogComponent implements OnInit {

    cmPage: CmPageCm;
    isSaving: boolean;

    cmsubtopics: CmSubTopicCm[];

    cmmodules: CmModuleCm[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmPageService: CmPageCmService,
        private cmSubTopicService: CmSubTopicCmService,
        private cmModuleService: CmModuleCmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmSubTopicService.query()
            .subscribe((res: HttpResponse<CmSubTopicCm[]>) => { this.cmsubtopics = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModuleCm[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cmPage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmPageService.update(this.cmPage));
        } else {
            this.subscribeToSaveResponse(
                this.cmPageService.create(this.cmPage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPageCm>>) {
        result.subscribe((res: HttpResponse<CmPageCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPageCm) {
        this.eventManager.broadcast({ name: 'cmPageListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCmSubTopicById(index: number, item: CmSubTopicCm) {
        return item.id;
    }

    trackCmModuleById(index: number, item: CmModuleCm) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-cm-page-cm-popup',
    template: ''
})
export class CmPageCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPagePopupService: CmPageCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmPagePopupService
                    .open(CmPageCmDialogComponent as Component, params['id']);
            } else {
                this.cmPagePopupService
                    .open(CmPageCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
