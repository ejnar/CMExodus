import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPageAuthority } from './cm-page-authority.model';
import { CmPageAuthorityPopupService } from './cm-page-authority-popup.service';
import { CmPageAuthorityService } from './cm-page-authority.service';

@Component({
    selector: 'jhi-cm-page-authority-delete-dialog',
    templateUrl: './cm-page-authority-delete-dialog.component.html'
})
export class CmPageAuthorityDeleteDialogComponent {

    cmPageAuthority: CmPageAuthority;

    constructor(
        private cmPageAuthorityService: CmPageAuthorityService,
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
    selector: 'jhi-cm-page-authority-delete-popup',
    template: ''
})
export class CmPageAuthorityDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPageAuthorityPopupService: CmPageAuthorityPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmPageAuthorityPopupService
                .open(CmPageAuthorityDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
