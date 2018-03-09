import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPortalCm } from './cm-portal-cm.model';
import { CmPortalCmPopupService } from './cm-portal-cm-popup.service';
import { CmPortalCmService } from './cm-portal-cm.service';

@Component({
    selector: 'jhi-cm-portal-cm-dialog',
    templateUrl: './cm-portal-cm-dialog.component.html'
})
export class CmPortalCmDialogComponent implements OnInit {

    cmPortal: CmPortalCm;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cmPortalService: CmPortalCmService,
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
        if (this.cmPortal.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmPortalService.update(this.cmPortal));
        } else {
            this.subscribeToSaveResponse(
                this.cmPortalService.create(this.cmPortal));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPortalCm>>) {
        result.subscribe((res: HttpResponse<CmPortalCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPortalCm) {
        this.eventManager.broadcast({ name: 'cmPortalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cm-portal-cm-popup',
    template: ''
})
export class CmPortalCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPortalPopupService: CmPortalCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmPortalPopupService
                    .open(CmPortalCmDialogComponent as Component, params['id']);
            } else {
                this.cmPortalPopupService
                    .open(CmPortalCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
