import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmImage } from './cm-image.model';
import { CmImagePopupService } from './cm-image-popup.service';
import { CmImageService } from './cm-image.service';
import { CmModule, CmModuleService } from '../cm-module';
import { CmItem, CmItemService } from '../cm-item';

@Component({
    selector: 'jhi-cm-image-dialog',
    templateUrl: './cm-image-dialog.component.html'
})
export class CmImageDialogComponent implements OnInit {

    cmImage: CmImage;
    isSaving: boolean;

    cmmodules: CmModule[];

    cmitems: CmItem[];
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmImageService: CmImageService,
        private cmModuleService: CmModuleService,
        private cmItemService: CmItemService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModule[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmItemService.query()
            .subscribe((res: HttpResponse<CmItem[]>) => { this.cmitems = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmImage>>) {
        result.subscribe((res: HttpResponse<CmImage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmImage) {
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

    trackCmModuleById(index: number, item: CmModule) {
        return item.id;
    }

    trackCmItemById(index: number, item: CmItem) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-image-popup',
    template: ''
})
export class CmImagePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmImagePopupService: CmImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmImagePopupService
                    .open(CmImageDialogComponent as Component, params['id']);
            } else {
                this.cmImagePopupService
                    .open(CmImageDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
