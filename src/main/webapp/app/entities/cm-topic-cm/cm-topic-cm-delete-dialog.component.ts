import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CmTopicCm } from './cm-topic-cm.model';
import { CmTopicCmPopupService } from './cm-topic-cm-popup.service';
import { CmTopicCmService } from './cm-topic-cm.service';

@Component({
    selector: 'jhi-cm-topic-cm-delete-dialog',
    templateUrl: './cm-topic-cm-delete-dialog.component.html'
})
export class CmTopicCmDeleteDialogComponent {

    cmTopic: CmTopicCm;

    constructor(
        private cmTopicService: CmTopicCmService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cmTopicService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cmTopicListModification',
                content: 'Deleted an cmTopic'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cm-topic-cm-delete-popup',
    template: ''
})
export class CmTopicCmDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cmTopicPopupService: CmTopicCmPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cmTopicPopupService
                .open(CmTopicCmDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
