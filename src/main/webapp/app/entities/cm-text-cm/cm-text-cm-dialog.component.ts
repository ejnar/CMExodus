import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmTextCm } from './cm-text-cm.model';
import { CmTextCmPopupService } from './cm-text-cm-popup.service';
import { CmTextCmService } from './cm-text-cm.service';
import { CmModuleCm, CmModuleCmService } from '../cm-module-cm';
import { CmItemCm, CmItemCmService } from '../cm-item-cm';

@Component({
    selector: 'jhi-cm-text-cm-dialog',
    templateUrl: './cm-text-cm-dialog.component.html'
})
export class CmTextCmDialogComponent implements OnInit {

    cmText: CmTextCm;
    isSaving: boolean;

    cmmodules: CmModuleCm[];

    cmitems: CmItemCm[];
    dateDp: any;
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmTextService: CmTextCmService,
        private cmModuleService: CmModuleCmService,
        private cmItemService: CmItemCmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModuleCm[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmItemService.query()
            .subscribe((res: HttpResponse<CmItemCm[]>) => { this.cmitems = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cmText.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmTextService.update(this.cmText));
        } else {
            this.subscribeToSaveResponse(
                this.cmTextService.create(this.cmText));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmTextCm>>) {
        result.subscribe((res: HttpResponse<CmTextCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmTextCm) {
        this.eventManager.broadcast({ name: 'cmTextListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCmModuleById(index: number, item: CmModuleCm) {
        return item.id;
    }

    trackCmItemById(index: number, item: CmItemCm) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-text-cm-popup',
    template: ''
})
export class CmTextCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTextPopupService: CmTextCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmTextPopupService
                    .open(CmTextCmDialogComponent as Component, params['id']);
            } else {
                this.cmTextPopupService
                    .open(CmTextCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
