import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmItemCm } from './cm-item-cm.model';
import { CmItemCmPopupService } from './cm-item-cm-popup.service';
import { CmItemCmService } from './cm-item-cm.service';
import { CmModuleCm, CmModuleCmService } from '../cm-module-cm';

@Component({
    selector: 'jhi-cm-item-cm-dialog',
    templateUrl: './cm-item-cm-dialog.component.html'
})
export class CmItemCmDialogComponent implements OnInit {

    cmItem: CmItemCm;
    isSaving: boolean;

    cmmodules: CmModuleCm[];
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmItemService: CmItemCmService,
        private cmModuleService: CmModuleCmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModuleCm[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cmItem.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmItemService.update(this.cmItem));
        } else {
            this.subscribeToSaveResponse(
                this.cmItemService.create(this.cmItem));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmItemCm>>) {
        result.subscribe((res: HttpResponse<CmItemCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmItemCm) {
        this.eventManager.broadcast({ name: 'cmItemListModification', content: 'OK'});
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
}

@Component({
    selector: 'jhi-cm-item-cm-popup',
    template: ''
})
export class CmItemCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemPopupService: CmItemCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmItemPopupService
                    .open(CmItemCmDialogComponent as Component, params['id']);
            } else {
                this.cmItemPopupService
                    .open(CmItemCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
