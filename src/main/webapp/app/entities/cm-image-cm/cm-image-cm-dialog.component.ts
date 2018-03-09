import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmImageCm } from './cm-image-cm.model';
import { CmImageCmPopupService } from './cm-image-cm-popup.service';
import { CmImageCmService } from './cm-image-cm.service';
import { CmModuleCm, CmModuleCmService } from '../cm-module-cm';
import { CmItemCm, CmItemCmService } from '../cm-item-cm';

@Component({
    selector: 'jhi-cm-image-cm-dialog',
    templateUrl: './cm-image-cm-dialog.component.html'
})
export class CmImageCmDialogComponent implements OnInit {

    cmImage: CmImageCm;
    isSaving: boolean;

    cmmodules: CmModuleCm[];

    cmitems: CmItemCm[];
    dateDp: any;
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmImageService: CmImageCmService,
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
        if (this.cmImage.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmImageService.update(this.cmImage));
        } else {
            this.subscribeToSaveResponse(
                this.cmImageService.create(this.cmImage));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmImageCm>>) {
        result.subscribe((res: HttpResponse<CmImageCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmImageCm) {
        this.eventManager.broadcast({ name: 'cmImageListModification', content: 'OK'});
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
    selector: 'jhi-cm-image-cm-popup',
    template: ''
})
export class CmImageCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmImagePopupService: CmImageCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmImagePopupService
                    .open(CmImageCmDialogComponent as Component, params['id']);
            } else {
                this.cmImagePopupService
                    .open(CmImageCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
