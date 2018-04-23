import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPage } from './cm-page.model';
import { CmPagePopupService } from './cm-page-popup.service';
import { CmPageService } from './cm-page.service';
import { CmModule, CmModuleService } from '../cm-module';

@Component({
    selector: 'jhi-cm-page-dialog',
    templateUrl: './cm-page-dialog.component.html'
})
export class CmPageDialogComponent implements OnInit {

    cmPage: CmPage;
    isSaving: boolean;

    cmmodules: CmModule[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmPageService: CmPageService,
        private cmModuleService: CmModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModule[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPage>>) {
        result.subscribe((res: HttpResponse<CmPage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPage) {
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

    trackCmModuleById(index: number, item: CmModule) {
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
    selector: 'jhi-cm-page-popup',
    template: ''
})
export class CmPagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPagePopupService: CmPagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmPagePopupService
                    .open(CmPageDialogComponent as Component, params['id']);
            } else {
                this.cmPagePopupService
                    .open(CmPageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
