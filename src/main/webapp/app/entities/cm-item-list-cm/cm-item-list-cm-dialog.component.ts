import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmItemListCm } from './cm-item-list-cm.model';
import { CmItemListCmPopupService } from './cm-item-list-cm-popup.service';
import { CmItemListCmService } from './cm-item-list-cm.service';
import { CmModuleCm, CmModuleCmService } from '../cm-module-cm';
import { CmImageCm, CmImageCmService } from '../cm-image-cm';

@Component({
    selector: 'jhi-cm-item-list-cm-dialog',
    templateUrl: './cm-item-list-cm-dialog.component.html'
})
export class CmItemListCmDialogComponent implements OnInit {

    cmItemList: CmItemListCm;
    isSaving: boolean;

    cmmodules: CmModuleCm[];

    images: CmImageCm[];
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmItemListService: CmItemListCmService,
        private cmModuleService: CmModuleCmService,
        private cmImageService: CmImageCmService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModuleCm[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmImageService
            .query({filter: 'cmitemlist-is-null'})
            .subscribe((res: HttpResponse<CmImageCm[]>) => {
                if (!this.cmItemList.imageId) {
                    this.images = res.body;
                } else {
                    this.cmImageService
                        .find(this.cmItemList.imageId)
                        .subscribe((subRes: HttpResponse<CmImageCm>) => {
                            this.images = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cmItemList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmItemListService.update(this.cmItemList));
        } else {
            this.subscribeToSaveResponse(
                this.cmItemListService.create(this.cmItemList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmItemListCm>>) {
        result.subscribe((res: HttpResponse<CmItemListCm>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmItemListCm) {
        this.eventManager.broadcast({ name: 'cmItemListListModification', content: 'OK'});
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

    trackCmImageById(index: number, item: CmImageCm) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-item-list-cm-popup',
    template: ''
})
export class CmItemListCmPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemListPopupService: CmItemListCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmItemListPopupService
                    .open(CmItemListCmDialogComponent as Component, params['id']);
            } else {
                this.cmItemListPopupService
                    .open(CmItemListCmDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
