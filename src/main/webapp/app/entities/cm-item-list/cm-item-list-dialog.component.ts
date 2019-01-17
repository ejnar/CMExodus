import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { NGXLogger } from 'ngx-logger';

import { CmItemList } from './cm-item-list.model';
import { CmItemListPopupService } from './cm-item-list-popup.service';
import { CmItemListService } from './cm-item-list.service';
import { CmModule, CmModuleService } from '../cm-module';
import { CmImage, CmImageService } from '../cm-image';

@Component({
    selector: 'jhi-cm-item-list-dialog',
    templateUrl: './cm-item-list-dialog.component.html'
})
export class CmItemListDialogComponent implements OnInit {

    cmItemList: CmItemList;
    isSaving: boolean;

    cmmodules: CmModule[];

    images: CmImage[];
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmItemListService: CmItemListService,
        private cmModuleService: CmModuleService,
        private cmImageService: CmImageService,
        private eventManager: JhiEventManager,
        private logger: NGXLogger
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModule[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmImageService
            .query({filter: 'cmitemlist-is-null'})
            .subscribe((res: HttpResponse<CmImage[]>) => {
                if (!this.cmItemList.imageId) {
                    this.images = res.body;
                } else {
                    this.cmImageService
                        .find(this.cmItemList.imageId)
                        .subscribe((subRes: HttpResponse<CmImage>) => {
                            this.images = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.logger.debug(this.cmItemList);
        this.isSaving = true;
        if (this.cmItemList.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmItemListService.update(this.cmItemList));
        } else {
            this.subscribeToSaveResponse(
                this.cmItemListService.create(this.cmItemList));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmItemList>>) {
        result.subscribe((res: HttpResponse<CmItemList>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmItemList) {
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

    trackCmModuleById(index: number, item: CmModule) {
        return item.id;
    }

    trackCmImageById(index: number, item: CmImage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-item-list-popup',
    template: ''
})
export class CmItemListPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemListPopupService: CmItemListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmItemListPopupService
                    .open(CmItemListDialogComponent as Component, params['id']);
            } else {
                this.cmItemListPopupService
                    .open(CmItemListDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
