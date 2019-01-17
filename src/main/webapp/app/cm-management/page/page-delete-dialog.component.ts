import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmPage } from '../../entities/cm-page/cm-page.model';
import { CmPageService } from '../../entities/cm-page/cm-page.service';

import { PagePopupService } from './page-popup.service';

@Component({
    selector: 'jhi-page-delete-dialog',
    templateUrl: './page-delete-dialog.component.html'
})
export class PageDeleteDialogComponent {

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
    selector: 'jhi-page-delete-popup',
    template: ''
})
export class PageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagePopupService: PagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagePopupService
                .open(PageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
