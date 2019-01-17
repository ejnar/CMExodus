import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { NGXLogger } from 'ngx-logger';

import { Observable } from 'rxjs/Observable';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPage } from '../../entities/cm-page/cm-page.model';
import { CmPageService } from '../../entities/cm-page/cm-page.service';
import { CmModuleService } from '../../entities/cm-module/cm-module.service';
import { CmModule } from '../../entities/cm-module';
import { CmPageAuthority } from '../../entities/cm-page-authority/cm-page-authority.model';

import { ExtendedPageService } from './extended-page.service';
import { ITEMS_PER_PAGE, Principal, User, UserService } from '../../shared';

@Component({
    selector: 'jhi-page-edit',
    templateUrl: './page-edit.component.html'
})
export class PageEditComponent implements OnInit, OnDestroy {

    cmPage: CmPage = {};
    cmmodules: CmModule[] = [];
    cmPageAuthorities: CmPageAuthority[] = [];
    eventSubscriber: Subscription;
    private subscription: Subscription;

    constructor(
        private jhiAlertService: JhiAlertService,
        private cmPageService: CmPageService,
        private cmModuleService: CmModuleService,
        private extendedPageService: ExtendedPageService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private route: ActivatedRoute,
        private router: Router,
        private logger: NGXLogger
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
            this.registerChangeInCmPages(params['id']);
        });

    }

    load(id) {
        this.extendedPageService.findResources(id).subscribe((responseList: HttpResponse<any[]>) => {
            this.cmPage = responseList[0].body;
            this.cmmodules = responseList[1].body;
            this.setSelectedModule(this.cmmodules, this.cmPage.modules);
        });
    }

    clear() {
        // window.history.back();
        this.router.navigate(['/admin/page']);
    }

    save() {
        this.logger.debug(this.cmPage);

        if (this.cmPage.id !== undefined) {
            this.subscribeToSaveResponse(this.cmPageService.update(this.cmPage));
        } else {
            this.subscribeToSaveResponse(this.cmPageService.create(this.cmPage));
        }
    }

    removeModule(module) {
        const index = this.cmPage.modules.indexOf(module);
        this.logger.debug(index);
        this.cmPage.modules.splice(index, 1);
        this.subscribeToUpdateResponse(this.cmPageService.update(this.cmPage), module.id);
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.subscription);
    }

    registerChangeInCmPages(id) {
        this.eventSubscriber = this.eventManager.subscribe('cmPageListModification', (response) => this.load(id));
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPage>>) {
        result.subscribe((res: HttpResponse<CmPage>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPage) {
        this.clear();
    }

    private subscribeToUpdateResponse(result: Observable<HttpResponse<CmPage>>, id: any) {
        result.subscribe((res: HttpResponse<CmPage>) =>
            this.onUpdateRemoveSuccess(res.body, id), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onUpdateRemoveSuccess(result: CmPage, id: any) {
        this.cmModuleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({ name: 'cmPageListModification', content: 'OK'});
        });
    }

    private onSaveError() {
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCmModuleById(index: number, item: CmModule) {
        return item.id;
    }

    setSelectedModule(selectedAll: Array<any>, selectedVals: Array<any>) {
        for (let i = 0; i < selectedAll.length; i++) {
            selectedAll[i].checked = false;
            for (let j = 0; j < selectedVals.length; j++) {
                if (selectedAll[i].id === selectedVals[j].id) {
                    selectedAll[i].checked = true;
                }
            }
        }

    }
}
