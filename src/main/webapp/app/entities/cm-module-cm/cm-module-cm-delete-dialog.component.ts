import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmModuleCm } from './cm-module-cm.model';
import { CmModuleCmPopupService } from './cm-module-cm-popup.service';
import { CmModuleCmService } from './cm-module-cm.service';

@Component({
    selector: 'jhi-cm-module-cm-delete-dialog',
    templateUrl: './cm-module-cm-delete-dialog.component.html'
})
export class CmModuleCmDeleteDialogComponent {

    cmModule: CmModuleCm;

    constructor(
        private cmModuleService: CmModuleCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmModuleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmModuleListModification',
                content: 'Deleted an cmModule'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-module-cm-delete-popup',
    template: ''
})
export class CmModuleCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmModulePopupService: CmModuleCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmModulePopupService
                .open(CmModuleCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
