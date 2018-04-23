import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmItem } from './cm-item.model';
import { CmItemPopupService } from './cm-item-popup.service';
import { CmItemService } from './cm-item.service';
import { CmModule, CmModuleService } from '../cm-module';

@Component({
    selector: 'jhi-cm-item-dialog',
    templateUrl: './cm-item-dialog.component.html'
})
export class CmItemDialogComponent implements OnInit {

    cmItem: CmItem;
    isSaving: boolean;

    cmmodules: CmModule[];
    publishDateDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmItemService: CmItemService,
        private cmModuleService: CmModuleService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cmModuleService.query()
            .subscribe((res: HttpResponse<CmModule[]>) => { this.cmmodules = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
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

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmItem>>) {
        result.subscribe((res: HttpResponse<CmItem>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmItem) {
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

    trackCmModuleById(index: number, item: CmModule) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-item-popup',
    template: ''
})
export class CmItemPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemPopupService: CmItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cmItemPopupService
                    .open(CmItemDialogComponent as Component, params['id']);
            } else {
                this.cmItemPopupService
                    .open(CmItemDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
