import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmItemListCm } from './cm-item-list-cm.model';
import { CmItemListCmPopupService } from './cm-item-list-cm-popup.service';
import { CmItemListCmService } from './cm-item-list-cm.service';

@Component({
    selector: 'jhi-cm-item-list-cm-delete-dialog',
    templateUrl: './cm-item-list-cm-delete-dialog.component.html'
})
export class CmItemListCmDeleteDialogComponent {

    cmItemList: CmItemListCm;

    constructor(
        private cmItemListService: CmItemListCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmItemListService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmItemListListModification',
                content: 'Deleted an cmItemList'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-item-list-cm-delete-popup',
    template: ''
})
export class CmItemListCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemListPopupService: CmItemListCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmItemListPopupService
                .open(CmItemListCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
