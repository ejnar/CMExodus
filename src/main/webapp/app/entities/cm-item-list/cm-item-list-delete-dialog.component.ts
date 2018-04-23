import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmItemList } from './cm-item-list.model';
import { CmItemListPopupService } from './cm-item-list-popup.service';
import { CmItemListService } from './cm-item-list.service';

@Component({
    selector: 'jhi-cm-item-list-delete-dialog',
    templateUrl: './cm-item-list-delete-dialog.component.html'
})
export class CmItemListDeleteDialogComponent {

    cmItemList: CmItemList;

    constructor(
        private cmItemListService: CmItemListService,
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
    selector: 'jhi-cm-item-list-delete-popup',
    template: ''
})
export class CmItemListDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemListPopupService: CmItemListPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmItemListPopupService
                .open(CmItemListDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
