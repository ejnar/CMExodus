import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPageAuthority } from './cm-page-authority.model';
import { CmPageAuthorityPopupService } from './cm-page-authority-popup.service';
import { CmPageAuthorityService } from './cm-page-authority.service';
import { CmPage, CmPageService } from '../cm-page';

@Component({
    selector: 'jhi-cm-page-authority-dialog',
    templateUrl: './cm-page-authority-dialog.component.html'
})
export class CmPageAuthorityDialogComponent implements OnInit {

    cmPageAuthority: CmPageAuthority;
    isSaving: boolean;

    cmpages: CmPage[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmPageAuthorityService: CmPageAuthorityService,
        private cmPageService: CmPageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmPageService.query()
            .subscribe((res: HttpResponse<CmPage[]>) => { this.cmpages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cmPageAuthority.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmPageAuthorityService.update(this.cmPageAuthority));
        } else {
            this.subscribeToSaveResponse(
                this.cmPageAuthorityService.create(this.cmPageAuthority));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPageAuthority>>) {
        result.subscribe((res: HttpResponse<CmPageAuthority>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPageAuthority) {
        this.eventManager.broadcast({ name: 'cmPageAuthorityListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCmPageById(index: number, item: CmPage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-page-authority-popup',
    template: ''
})
export class CmPageAuthorityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPageAuthorityPopupService: CmPageAuthorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmPageAuthorityPopupService
                    .open(CmPageAuthorityDialogComponent as Component, params['id']);
            } else {
                this.cmPageAuthorityPopupService
                    .open(CmPageAuthorityDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
