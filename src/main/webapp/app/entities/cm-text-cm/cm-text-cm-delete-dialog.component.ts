import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmTextCm } from './cm-text-cm.model';
import { CmTextCmPopupService } from './cm-text-cm-popup.service';
import { CmTextCmService } from './cm-text-cm.service';

@Component({
    selector: 'jhi-cm-text-cm-delete-dialog',
    templateUrl: './cm-text-cm-delete-dialog.component.html'
})
export class CmTextCmDeleteDialogComponent {

    cmText: CmTextCm;

    constructor(
        private cmTextService: CmTextCmService,
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
    selector: 'jhi-cm-text-cm-delete-popup',
    template: ''
})
export class CmTextCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTextPopupService: CmTextCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmTextPopupService
                .open(CmTextCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
