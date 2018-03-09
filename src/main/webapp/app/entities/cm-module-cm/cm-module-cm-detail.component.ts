import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmModuleCm } from './cm-module-cm.model';
import { CmModuleCmService } from './cm-module-cm.service';

@Component({
    selector: 'jhi-cm-module-cm-detail',
    templateUrl: './cm-module-cm-detail.component.html'
})
export class CmModuleCmDetailComponent implements OnInit, OnDestroy {

    cmModule: CmModuleCm;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmModuleService: CmModuleCmService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCmModules();
    }

    load(id) {
        this.cmModuleService.find(id)
            .subscribe((cmModuleResponse: HttpResponse<CmModuleCm>) => {
                this.cmModule = cmModuleResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCmModules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'cmModuleListModification',
            (response) => this.load(this.cmModule.id)
        );
    }
}
