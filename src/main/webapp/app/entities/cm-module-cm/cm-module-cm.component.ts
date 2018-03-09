import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmModuleCm } from './cm-module-cm.model';
import { CmModuleCmService } from './cm-module-cm.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-module-cm',
    templateUrl: './cm-module-cm.component.html'
})
export class CmModuleCmComponent implements OnInit, OnDestroy {
cmModules: CmModuleCm[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmModuleService: CmModuleCmService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmModuleService.query().subscribe(
            (res: HttpResponse<CmModuleCm[]>) => {
                this.cmModules = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmModuleCm) {
        return item.id;
    }
    registerChangeInCmModules() {
        this.eventSubscriber = this.eventManager.subscribe('cmModuleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
