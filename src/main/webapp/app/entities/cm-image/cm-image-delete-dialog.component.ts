import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmImage } from './cm-image.model';
import { CmImagePopupService } from './cm-image-popup.service';
import { CmImageService } from './cm-image.service';

@Component({
    selector: 'jhi-cm-image-delete-dialog',
    templateUrl: './cm-image-delete-dialog.component.html'
})
export class CmImageDeleteDialogComponent {

    cmImage: CmImage;

    constructor(
        private cmImageService: CmImageService,
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
    selector: 'jhi-cm-image-delete-popup',
    template: ''
})
export class CmImageDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmImagePopupService: CmImagePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmImagePopupService
                .open(CmImageDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
