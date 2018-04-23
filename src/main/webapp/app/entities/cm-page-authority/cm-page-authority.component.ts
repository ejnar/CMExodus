import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPageAuthority } from './cm-page-authority.model';
import { CmPageAuthorityService } from './cm-page-authority.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-cm-page-authority',
    templateUrl: './cm-page-authority.component.html'
})
export class CmPageAuthorityComponent implements OnInit, OnDestroy {
cmPageAuthorities: CmPageAuthority[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private cmPageAuthorityService: CmPageAuthorityService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.cmPageAuthorityService.query().subscribe(
            (res: HttpResponse<CmPageAuthority[]>) => {
                this.cmPageAuthorities = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCmPageAuthorities();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CmPageAuthority) {
        return item.id;
    }
    registerChangeInCmPageAuthorities() {
        this.eventSubscriber = this.eventManager.subscribe('cmPageAuthorityListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
