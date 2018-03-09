import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmSubTopicCm } from './cm-sub-topic-cm.model';
import { CmSubTopicCmPopupService } from './cm-sub-topic-cm-popup.service';
import { CmSubTopicCmService } from './cm-sub-topic-cm.service';

@Component({
    selector: 'jhi-cm-sub-topic-cm-delete-dialog',
    templateUrl: './cm-sub-topic-cm-delete-dialog.component.html'
})
export class CmSubTopicCmDeleteDialogComponent {

    cmSubTopic: CmSubTopicCm;

    constructor(
        private cmSubTopicService: CmSubTopicCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmSubTopicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmSubTopicListModification',
                content: 'Deleted an cmSubTopic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-sub-topic-cm-delete-popup',
    template: ''
})
export class CmSubTopicCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmSubTopicPopupService: CmSubTopicCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmSubTopicPopupService
                .open(CmSubTopicCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
