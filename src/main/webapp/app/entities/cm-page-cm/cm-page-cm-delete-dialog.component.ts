import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPageCm } from './cm-page-cm.model';
import { CmPageCmPopupService } from './cm-page-cm-popup.service';
import { CmPageCmService } from './cm-page-cm.service';

@Component({
    selector: 'jhi-cm-page-cm-delete-dialog',
    templateUrl: './cm-page-cm-delete-dialog.component.html'
})
export class CmPageCmDeleteDialogComponent {

    cmPage: CmPageCm;

    constructor(
        private cmPageService: CmPageCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmPageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmPageListModification',
                content: 'Deleted an cmPage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-page-cm-delete-popup',
    template: ''
})
export class CmPageCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPagePopupService: CmPageCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmPagePopupService
                .open(CmPageCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
