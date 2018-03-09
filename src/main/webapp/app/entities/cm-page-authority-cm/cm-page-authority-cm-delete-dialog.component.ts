import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPageAuthorityCm } from './cm-page-authority-cm.model';
import { CmPageAuthorityCmPopupService } from './cm-page-authority-cm-popup.service';
import { CmPageAuthorityCmService } from './cm-page-authority-cm.service';

@Component({
    selector: 'jhi-cm-page-authority-cm-delete-dialog',
    templateUrl: './cm-page-authority-cm-delete-dialog.component.html'
})
export class CmPageAuthorityCmDeleteDialogComponent {

    cmPageAuthority: CmPageAuthorityCm;

    constructor(
        private cmPageAuthorityService: CmPageAuthorityCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmPageAuthorityService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmPageAuthorityListModification',
                content: 'Deleted an cmPageAuthority'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-page-authority-cm-delete-popup',
    template: ''
})
export class CmPageAuthorityCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPageAuthorityPopupService: CmPageAuthorityCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmPageAuthorityPopupService
                .open(CmPageAuthorityCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
