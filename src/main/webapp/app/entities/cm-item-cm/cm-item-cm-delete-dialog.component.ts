import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmItemCm } from './cm-item-cm.model';
import { CmItemCmPopupService } from './cm-item-cm-popup.service';
import { CmItemCmService } from './cm-item-cm.service';

@Component({
    selector: 'jhi-cm-item-cm-delete-dialog',
    templateUrl: './cm-item-cm-delete-dialog.component.html'
})
export class CmItemCmDeleteDialogComponent {

    cmItem: CmItemCm;

    constructor(
        private cmItemService: CmItemCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmItemService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmItemListModification',
                content: 'Deleted an cmItem'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-item-cm-delete-popup',
    template: ''
})
export class CmItemCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemPopupService: CmItemCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmItemPopupService
                .open(CmItemCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
