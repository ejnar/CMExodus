import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPageAuthorityCm } from './cm-page-authority-cm.model';
import { CmPageAuthorityCmPopupService } from './cm-page-authority-cm-popup.service';
import { CmPageAuthorityCmService } from './cm-page-authority-cm.service';
import { CmPageCm, CmPageCmService } from '../cm-page-cm';

@Component({
    selector: 'jhi-cm-page-authority-cm-dialog',
    templateUrl: './cm-page-authority-cm-dialog.component.html'
})
export class CmPageAuthorityCmDialogComponent implements OnInit {

    cmPageAuthority: CmPageAuthorityCm;
    isSaving: boolean;

    cmpages: CmPageCm[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmPageAuthorityService: CmPageAuthorityCmService,
        private cmPageService: CmPageCmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmPageService.query()
            .subscribe((res: HttpResponse<CmPageCm[]>) => { this.cmpages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPageAuthorityCm>>) {
        result.subscribe((res: HttpResponse<CmPageAuthorityCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPageAuthorityCm) {
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

    trackCmPageById(index: number, item: CmPageCm) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-page-authority-cm-popup',
    template: ''
})
export class CmPageAuthorityCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPageAuthorityPopupService: CmPageAuthorityCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmPageAuthorityPopupService
                    .open(CmPageAuthorityCmDialogComponent as Component, params['id']);
            } else {
                this.cmPageAuthorityPopupService
                    .open(CmPageAuthorityCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
