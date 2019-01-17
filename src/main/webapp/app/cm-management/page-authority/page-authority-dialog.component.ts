import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CmPageAuthority } from '../../entities/cm-page-authority/cm-page-authority.model';
import { CmPageAuthorityService } from '../../entities/cm-page-authority/cm-page-authority.service';
import { CmPage, CmPageService } from '../../entities/cm-page';

import { PageAuthorityPopupService } from './page-authority-popup.service';

import { ITEMS_PER_PAGE, Principal, User, UserService } from '../../shared';

@Component({
    selector: 'jhi-page-authority-dialog',
    templateUrl: './page-authority-dialog.component.html'
})
export class PageAuthorityDialogComponent implements OnInit {

    cmPageAuthority: CmPageAuthority;
    selectedUser: User;
    isSaving: boolean;

    cmpages: CmPage[];
    users: User[];
    roles: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cmPageAuthorityService: CmPageAuthorityService,
        private cmPageService: CmPageService,
        private userService: UserService,
        private eventManager: JhiEventManager,
        private logger: NGXLogger
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.loadUser();
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    loadUser() {
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));

        this.userService.authoritiesByModule().subscribe((roles) => { this.roles = roles; });

        // this.userService.query({
        //    page: this.page - 1,
        //    size: this.itemsPerPage,
        //    sort: this.sort()}).subscribe(
        //        (res: HttpResponse<User[]>) => this.onSuccess(res.body, res.headers),
        //        (res: HttpResponse<any>) => this.onError(res.body)
        // );
    }

    loadPage() {
        this.cmPageService.query()
            .subscribe((res: HttpResponse<CmPage[]>) => { this.cmpages = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    save() {
        this.isSaving = true;
        if (this.cmPageAuthority.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cmPageAuthorityService.update(this.cmPageAuthority));
        } else {
            this.subscribeToSaveResponse(
                this.cmPageAuthorityService.create(this.cmPageAuthority));
        }
    }

    selectUser() {
        this.logger.debug('PageAuthorityDialogComponent.selectUser');
        this.cmPageAuthority.user = this.selectedUser.login;
        this.cmPageAuthority.userId = this.selectedUser.id;
        // this.logger.debug(this.selectedUser);
        this.logger.debug(this.cmPageAuthority);

    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CmPageAuthority>>) {
        result.subscribe((res: HttpResponse<CmPageAuthority>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CmPageAuthority) {
        this.eventManager.broadcast({ name: 'cmPageAuthorityListModification', content: 'OK'});
        this.isSaving = false;
        this.eventManager.broadcast({
                name: 'cmPageListModification',
                content: 'Updated an page-authority'
            });
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCmPageById(index: number, item: CmPage) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cm-page-authority-popup',
    template: ''
})
export class PageAuthorityPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pageAuthorityPopupService: PageAuthorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pageAuthorityPopupService
                    .open(PageAuthorityDialogComponent as Component, params['id']);
            } else {
                this.pageAuthorityPopupService
                    .open(PageAuthorityDialogComponent as Component, null, params['pageId']);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
