import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmModule } from './cm-module.model';
import { CmModulePopupService } from './cm-module-popup.service';
import { CmModuleService } from './cm-module.service';

@Component({
    selector: 'jhi-cm-module-dialog',
    templateUrl: './cm-module-dialog.component.html'
})
export class CmModuleDialogComponent implements OnInit {

    cmModule: CmModule;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cmModuleService: CmModuleService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmModule>>) {
        result.subscribe((res: HttpResponse<CmModule>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmModule) {
        this.eventManager.broadcast({ name: 'cmModuleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cm-module-popup',
    template: ''
})
export class CmModulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmModulePopupService: CmModulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmModulePopupService
                    .open(CmModuleDialogComponent as Component, params['id']);
            } else {
                this.cmModulePopupService
                    .open(CmModuleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
