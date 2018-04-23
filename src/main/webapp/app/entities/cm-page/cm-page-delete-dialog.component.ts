import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPage } from './cm-page.model';
import { CmPagePopupService } from './cm-page-popup.service';
import { CmPageService } from './cm-page.service';

@Component({
    selector: 'jhi-cm-page-delete-dialog',
    templateUrl: './cm-page-delete-dialog.component.html'
})
export class CmPageDeleteDialogComponent {

    cmPage: CmPage;

    constructor(
        private cmPageService: CmPageService,
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
    selector: 'jhi-cm-page-delete-popup',
    template: ''
})
export class CmPageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmPagePopupService: CmPagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmPagePopupService
                .open(CmPageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
