import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CmModule } from './cm-module.model';
import { CmModuleService } from './cm-module.service';

@Component({
    selector: 'jhi-cm-module-detail',
    templateUrl: './cm-module-detail.component.html'
})
export class CmModuleDetailComponent implements OnInit, OnDestroy {

    cmModule: CmModule;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private cmModuleService: CmModuleService,
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
            .subscribe((cmModuleResponse: HttpResponse<CmModule>) => {
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
