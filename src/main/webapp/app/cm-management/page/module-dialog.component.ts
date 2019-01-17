import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPage } from '../../entities/cm-page/cm-page.model';
import { CmItemList } from '../../entities/cm-item-list/cm-item-list.model';
import { CmText, TextType, LayoutType } from '../../entities/cm-text/cm-text.model';
import { CmPageService } from '../../entities/cm-page/cm-page.service';
import { PagePopupService } from './page-popup.service';
import { CmModule, CmModuleService, ModuleType } from '../../entities/cm-module';

@Component({
    selector: 'jhi-module-dialog',
    templateUrl: './module-dialog.component.html',
    styleUrls: [
        'page.scss'
    ]
})
export class ModuleDialogComponent implements OnInit {

    cmModules: CmModule[];
    cmPage: CmPage;
    cmText: CmText = new CmText();
    isSaving: boolean;

    cmModule: CmModule = new CmModule();
    // cmmodules: CmModule [];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmPageService: CmPageService,
        private cmModuleService: CmModuleService,
        private eventManager: JhiEventManager,
        private logger: NGXLogger
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        if (!this.cmModule.sorted) {
            this.cmModule.sorted = 0;
        }
        if (!this.cmModule.texts) {
            this.cmModule.texts = [];
        }
        this.loadAllModules();
        // this.logger.debug(this.cmPage);
    }

    loadAllModules() {
        this.cmModuleService.query().subscribe(
            (res: HttpResponse<CmModule[]>) => {
                this.cmModules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    onChangeModule(module) {
        this.cmModule = Object.assign({}, module);
        this.logger.debug(this.cmModule);
    }

    changeModuleType(cmModule) {
        // this.logger.debug(ModuleType.TEXT);
        // this.logger.debug(cmModule.moduleType);
        if (cmModule.moduleType === 'TEXT') {
            this.logger.debug('this.cmModule');
        }
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    initModule(module) {
        this.logger.debug('createText');
        this.logger.debug(module);

        if (module.texts && module.texts.length < 1) {
            module.init();
            if (module.moduleType === 'TEXT_LIST' ) {
                module.init_TEXTLIST();
            }
            if (module.moduleType === 'PROGRAM_LIST') {
                this.logger.debug('PROGRAM_LIST');
                module.init_PROGRAM_LIST();
            }
        }
        this.logger.debug(module);
    }

    save() {
        this.isSaving = true;
        if (this.cmPage.id !== undefined) {
            if (this.cmModule.init) {
                this.cmModule.init();
            }
            if (this.cmModule.id !== undefined) {
                this.subscribeToSaveModuleResponse(
                    this.cmModuleService.update(this.cmModule));
            } else {
                this.subscribeToSaveModuleResponse(
                    this.cmModuleService.create(this.cmModule));
            }
        } else {
            this.logger.error(' --- Missing pageId! ');
        }
    }

    private subscribeToSaveModuleResponse(result: Observable<HttpResponse<CmModule>>) {
        result.subscribe((res: HttpResponse<CmModule>) =>
            this.onSaveModuleSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveModuleSuccess(module: CmModule) {
        this.cmPage.modules.push(module);
        this.logger.debug(this.cmPage);
        this.subscribeToSaveResponse(this.cmPageService.update(this.cmPage));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPage>>) {
        result.subscribe((res: HttpResponse<CmPage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPage) {
        this.eventManager.broadcast({ name: 'cmPageListModification', content: 'OK'});
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

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-module-add-popup',
    template: ''
})
export class ModulePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagePopupService: PagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagePopupService
                    .open(ModuleDialogComponent as Component, parseInt(params['id'], 10));
            } else if (params['pageId'] && params['moduleId']) {
                this.pagePopupService
                    .open(ModuleDialogComponent as Component, parseInt(params['pageId'], 10), parseInt(params['moduleId'], 10) );
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
