import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmText } from './cm-text.model';
import { CmTextPopupService } from './cm-text-popup.service';
import { CmTextService } from './cm-text.service';

@Component({
    selector: 'jhi-cm-text-delete-dialog',
    templateUrl: './cm-text-delete-dialog.component.html'
})
export class CmTextDeleteDialogComponent {

    cmText: CmText;

    constructor(
        private cmTextService: CmTextService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmTextService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmTextListModification',
                content: 'Deleted an cmText'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-text-delete-popup',
    template: ''
})
export class CmTextDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTextPopupService: CmTextPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmTextPopupService
                .open(CmTextDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
