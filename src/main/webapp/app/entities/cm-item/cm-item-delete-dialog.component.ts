import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmItem } from './cm-item.model';
import { CmItemPopupService } from './cm-item-popup.service';
import { CmItemService } from './cm-item.service';

@Component({
    selector: 'jhi-cm-item-delete-dialog',
    templateUrl: './cm-item-delete-dialog.component.html'
})
export class CmItemDeleteDialogComponent {

    cmItem: CmItem;

    constructor(
        private cmItemService: CmItemService,
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
    selector: 'jhi-cm-item-delete-popup',
    template: ''
})
export class CmItemDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmItemPopupService: CmItemPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmItemPopupService
                .open(CmItemDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
