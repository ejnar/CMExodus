import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmText } from './cm-text.model';
import { CmTextPopupService } from './cm-text-popup.service';
import { CmTextService } from './cm-text.service';
import { CmModule, CmModuleService } from '../cm-module';
import { CmItem, CmItemService } from '../cm-item';
import { CmImage, CmImageService } from '../cm-image';

@Component({
    selector: 'jhi-cm-text-dialog',
    templateUrl: './cm-text-dialog.component.html'
})
export class CmTextDialogComponent implements OnInit {

    cmText: CmText;
    isSaving: boolean;

    cmmodules: CmModule[];

    cmitems: CmItem[];

    images: CmImage[];
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmTextService: CmTextService,
        private cmModuleService: CmModuleService,
        private cmItemService: CmItemService,
        private cmImageService: CmImageService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModule[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmItemService.query()
            .subscribe((res: HttpResponse<CmItem[]>) => { this.cmitems = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.cmImageService
            .query({filter: 'cmtext-is-null'})
            .subscribe((res: HttpResponse<CmImage[]>) => {
                if (!this.cmText.imageId) {
                    this.images = res.body;
                } else {
                    this.cmImageService
                        .find(this.cmText.imageId)
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
        this.isSaving = true;
        if (this.cmText.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmTextService.update(this.cmText));
        } else {
            this.subscribeToSaveResponse(
                this.cmTextService.create(this.cmText));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmText>>) {
        result.subscribe((res: HttpResponse<CmText>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmText) {
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

    trackCmModuleById(index: number, item: CmModule) {
        return item.id;
    }

    trackCmItemById(index: number, item: CmItem) {
        return item.id;
    }

    trackCmImageById(index: number, item: CmImage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-text-popup',
    template: ''
})
export class CmTextPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTextPopupService: CmTextPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmTextPopupService
                    .open(CmTextDialogComponent as Component, params['id']);
            } else {
                this.cmTextPopupService
                    .open(CmTextDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
