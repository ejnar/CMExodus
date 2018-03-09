import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPortalCm } from './cm-portal-cm.model';
import { CmPortalCmPopupService } from './cm-portal-cm-popup.service';
import { CmPortalCmService } from './cm-portal-cm.service';

@Component({
    selector: 'jhi-cm-portal-cm-delete-dialog',
    templateUrl: './cm-portal-cm-delete-dialog.component.html'
})
export class CmPortalCmDeleteDialogComponent {

    cmPortal: CmPortalCm;

    constructor(
        private cmPortalService: CmPortalCmService,
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
    selector: 'jhi-cm-portal-cm-delete-popup',
    template: ''
})
export class CmPortalCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPortalPopupService: CmPortalCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmPortalPopupService
                .open(CmPortalCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
