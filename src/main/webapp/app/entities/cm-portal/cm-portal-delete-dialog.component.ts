import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPortal } from './cm-portal.model';
import { CmPortalPopupService } from './cm-portal-popup.service';
import { CmPortalService } from './cm-portal.service';

@Component({
    selector: 'jhi-cm-portal-delete-dialog',
    templateUrl: './cm-portal-delete-dialog.component.html'
})
export class CmPortalDeleteDialogComponent {

    cmPortal: CmPortal;

    constructor(
        private cmPortalService: CmPortalService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmPortalService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmPortalListModification',
                content: 'Deleted an cmPortal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-portal-delete-popup',
    template: ''
})
export class CmPortalDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPortalPopupService: CmPortalPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmPortalPopupService
                .open(CmPortalDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
