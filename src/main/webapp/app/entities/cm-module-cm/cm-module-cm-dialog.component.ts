import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmModuleCm } from './cm-module-cm.model';
import { CmModuleCmPopupService } from './cm-module-cm-popup.service';
import { CmModuleCmService } from './cm-module-cm.service';

@Component({
    selector: 'jhi-cm-module-cm-dialog',
    templateUrl: './cm-module-cm-dialog.component.html'
})
export class CmModuleCmDialogComponent implements OnInit {

    cmModule: CmModuleCm;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cmModuleService: CmModuleCmService,
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
        if (this.cmModule.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmModuleService.update(this.cmModule));
        } else {
            this.subscribeToSaveResponse(
                this.cmModuleService.create(this.cmModule));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmModuleCm>>) {
        result.subscribe((res: HttpResponse<CmModuleCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmModuleCm) {
        this.eventManager.broadcast({ name: 'cmModuleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cm-module-cm-popup',
    template: ''
})
export class CmModuleCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmModulePopupService: CmModuleCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmModulePopupService
                    .open(CmModuleCmDialogComponent as Component, params['id']);
            } else {
                this.cmModulePopupService
                    .open(CmModuleCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
