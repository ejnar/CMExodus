import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmImageCm } from './cm-image-cm.model';
import { CmImageCmPopupService } from './cm-image-cm-popup.service';
import { CmImageCmService } from './cm-image-cm.service';

@Component({
    selector: 'jhi-cm-image-cm-delete-dialog',
    templateUrl: './cm-image-cm-delete-dialog.component.html'
})
export class CmImageCmDeleteDialogComponent {

    cmImage: CmImageCm;

    constructor(
        private cmImageService: CmImageCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmImageService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmImageListModification',
                content: 'Deleted an cmImage'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-image-cm-delete-popup',
    template: ''
})
export class CmImageCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmImagePopupService: CmImageCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmImagePopupService
                .open(CmImageCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
