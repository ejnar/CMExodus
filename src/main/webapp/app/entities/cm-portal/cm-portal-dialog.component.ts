import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPortal } from './cm-portal.model';
import { CmPortalPopupService } from './cm-portal-popup.service';
import { CmPortalService } from './cm-portal.service';

@Component({
    selector: 'jhi-cm-portal-dialog',
    templateUrl: './cm-portal-dialog.component.html'
})
export class CmPortalDialogComponent implements OnInit {

    cmPortal: CmPortal;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private cmPortalService: CmPortalService,
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPortal>>) {
        result.subscribe((res: HttpResponse<CmPortal>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPortal) {
        this.eventManager.broadcast({ name: 'cmPortalListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-cm-portal-popup',
    template: ''
})
export class CmPortalPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPortalPopupService: CmPortalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmPortalPopupService
                    .open(CmPortalDialogComponent as Component, params['id']);
            } else {
                this.cmPortalPopupService
                    .open(CmPortalDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
