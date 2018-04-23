import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmModule } from './cm-module.model';
import { CmModulePopupService } from './cm-module-popup.service';
import { CmModuleService } from './cm-module.service';

@Component({
    selector: 'jhi-cm-module-delete-dialog',
    templateUrl: './cm-module-delete-dialog.component.html'
})
export class CmModuleDeleteDialogComponent {

    cmModule: CmModule;

    constructor(
        private cmModuleService: CmModuleService,
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
    selector: 'jhi-cm-module-delete-popup',
    template: ''
})
export class CmModuleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmModulePopupService: CmModulePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmModulePopupService
                .open(CmModuleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
