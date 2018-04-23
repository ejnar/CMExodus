import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmModule } from './cm-module.model';
import { CmModuleService } from './cm-module.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-module',
    templateUrl: './cm-module.component.html'
})
export class CmModuleComponent implements OnInit, OnDestroy {
cmModules: CmModule[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmModuleService: CmModuleService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmModuleService.query().subscribe(
            (res: HttpResponse<CmModule[]>) => {
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

    trackId(index: number, item: CmModule) {
        return item.id;
    }
    registerChangeInCmModules() {
        this.eventSubscriber = this.eventManager.subscribe('cmModuleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
